import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
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
  ) {}

  async createTraining(createTrainingDto: CreateTrainingDto) {
    createTrainingDto.players.forEach(async (player) => {
      const speed = this.caluclateSpeed(
        +player.stats[0].speed.distance,
        +player.stats[0].speed.time,
      );

      player.score = this.calculateScore(
        +player.stats[0].power,
        speed,
        +player.stats[0].passes,
      );

      const today = moment().utc().format('YYYY-MM-DD');
      player.created_at = today;

      const normalizedPlayer = {
        player_id: player.id,
        ...player,
      };
      const newPlayer = this.trainingRepository.create(normalizedPlayer);
      await this.trainingRepository.save(newPlayer);
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

  private caluclateSpeed(distance: number, time: number) {
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
