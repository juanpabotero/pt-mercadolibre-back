import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
  ) {}

  async createTraining(createTrainingDto: CreateTrainingDto) {
    console.log('createTrainingDto', createTrainingDto);
    createTrainingDto.players.forEach(async (player) => {
      const speed =
        +player.stats[0].speed.distance / +player.stats[0].speed.time;

      player.stats[0].speedCalculated = String(speed);
      player.score =
        +player.stats[0].speedCalculated *
        +player.stats[0].power *
        +player.stats[0].passes;

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
    return `This action returns all training`;
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

  calculateSpeed(distance: string, time: string) {
    const speed = +distance / +time;
    return speed;
  }
}
