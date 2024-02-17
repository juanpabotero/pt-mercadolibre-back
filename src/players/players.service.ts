import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    const newPlayer = this.playerRepository.create({
      name: createPlayerDto.name,
    });

    return this.playerRepository.save(newPlayer);
  }

  async findAllPlayers() {
    const players = await this.playerRepository.find();
    return { players };
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
