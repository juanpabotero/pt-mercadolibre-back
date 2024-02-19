import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from 'src/training/entities/training.entity';
import { TrainingService } from 'src/training/training.service';
import { Player } from './entities/player.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, TrainingService],
  imports: [TypeOrmModule.forFeature([Player, Training])],
  exports: [PlayersService],
})
export class PlayersModule {}
