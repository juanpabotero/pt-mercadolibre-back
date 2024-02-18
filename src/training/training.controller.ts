import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingService } from './training.service';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  createTraining(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingService.createTraining(createTrainingDto);
  }
}
