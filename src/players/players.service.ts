import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    const player = await this.playerRepository.findOne({
      where: { name: createPlayerDto.name },
    });

    if (player) {
      throw new HttpException('Player already exists', HttpStatus.CONFLICT);
    }

    const newPlayer = this.playerRepository.create(createPlayerDto);

    return this.playerRepository.save(newPlayer);
  }

  async findAllPlayers() {
    const players = await this.playerRepository.find();
    return { players };
  }

  async getPlayerById(id: number) {
    const player = await this.playerRepository.findOne({
      where: { id },
    });
    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }
    return player;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
