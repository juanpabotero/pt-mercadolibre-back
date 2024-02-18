import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { PlayersService } from 'src/players/players.service';
import { Repository } from 'typeorm';
import { PERCENTAGES } from '../shared/constants';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    private playersServices: PlayersService,
  ) {}

  async createTraining(createTrainingDto: CreateTrainingDto) {
    const trainingId = randomUUID();
    createTrainingDto.players.forEach(async (player) => {
      const playerFound = await this.playersServices.getPlayerById(player.id);

      const speed = this.calculateSpeed(
        +player.stats[0].speed.distance,
        +player.stats[0].speed.time,
      );
      player.score = this.calculateScore(
        +player.stats[0].power,
        speed,
        +player.stats[0].passes,
      );

      const newTraining = this.trainingRepository.create({
        training_id: trainingId,
        player: playerFound,
        ...player,
      });

      // if (playerFound.training) {
      //   playerFound.training = [...playerFound.training, newTraining];
      // }

      playerFound.training?.push(newTraining);

      await this.trainingRepository.save(newTraining);
    });
    return { message: 'Training created successfully' };
  }

  findAll() {
    return `This action all trainings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} training`;
  }

  update(id: number, updateTrainingDto: UpdateTrainingDto) {
    return `This action updates a #${id} training`;
  }

  remove(id: number) {
    return `This action removes a #${id} training`;
  }

  private calculateSpeed(distance: number, time: number) {
    return distance / time;
  }

  private calculateScore(power: number, speed: number, passes: number) {
    return Number(
      (
        power * PERCENTAGES.POWER +
        speed * PERCENTAGES.SPEED +
        passes * PERCENTAGES.PASSES
      ).toFixed(2),
    );
  }
}
