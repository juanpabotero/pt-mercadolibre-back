import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService],
  imports: [TypeOrmModule.forFeature([Training])],
  exports: [TrainingService],
})
export class TrainingModule {}
