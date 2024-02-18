import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { Training } from '../training/entities/training.entity';
import { TrainingService } from '../training/training.service';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TrainingService, PlayersService],
  imports: [TypeOrmModule.forFeature([Training, Player])],
  exports: [TeamService],
})
export class TeamModule {}
