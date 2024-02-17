import { Module } from '@nestjs/common';
import { TrainingService } from '../training/training.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Training } from '../training/entities/training.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TrainingService],
  imports: [TypeOrmModule.forFeature([Training])],
  exports: [TeamService],
})
export class TeamModule {}
