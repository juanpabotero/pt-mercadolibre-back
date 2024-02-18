import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Repository } from 'typeorm';
import { NUMBER_STARTING_PLAYERS } from '../shared/constants';
import { Training } from '../training/entities/training.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
  ) {}

  async getTeam() {
    const firstDayOfweek = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const lastDayOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DD');

    const queryTraining = this.trainingRepository.createQueryBuilder();
    const training = await queryTraining
      .select('COUNT(created_at), created_at, training_id')
      .where('created_at BETWEEN :firstDayOfweek AND :lastDayOfWeek', {
        firstDayOfweek,
        lastDayOfWeek,
      })
      .groupBy('created_at, training_id')
      .orderBy('created_at', 'DESC')
      .getRawMany();

    if (training.length < 3) {
      return { message: 'There is not enough information' };
    }

    const queryPlayers = this.trainingRepository.createQueryBuilder('training');
    const players = await queryPlayers
      .select(
        'COUNT(training_id), "playerId" as id, created_at, MAX(training.score) as score, MAX(players.name) as name',
      )
      .where('created_at BETWEEN :firstDayOfweek AND :lastDayOfWeek', {
        firstDayOfweek,
        lastDayOfWeek,
      })
      .innerJoin('training.player', 'players')
      .groupBy('created_at, training_id, "playerId"')
      .orderBy('created_at', 'DESC')
      .getRawMany();

    const playersScores = {};

    if (!players || players.length < 0) {
      return new HttpException('Players not found', HttpStatus.NOT_FOUND);
    }

    players.forEach((player) => {
      if (playersScores[player.id]) {
        playersScores[player.id].push(player.score);
      } else {
        playersScores[player.id] = [player.score];
      }
    });

    const playersAverage = {};

    for (const key in playersScores) {
      const scores = playersScores[key];
      // If player has less than 3 scores, we skip it
      if (scores.length < 3) {
        continue;
      }
      const sum = scores.reduce((a, b) => +a + +b, 0);
      playersAverage[key] = sum;
    }

    const topPlayers = Object.keys(playersAverage)
      .sort((a, b) => playersAverage[b] - playersAverage[a])
      .slice(0, NUMBER_STARTING_PLAYERS);

    const topPlayersData = [];

    topPlayers.forEach((playerId) => {
      let playerData = players.find((p) => p.id === +playerId);
      playerData.score = +playersAverage[playerId].toFixed(2);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { count, created_at, id, ...rest } = playerData;
      playerData = { id: Number(id), ...rest };
      topPlayersData.push(playerData);
    });

    return { players: topPlayersData };
  }
}
