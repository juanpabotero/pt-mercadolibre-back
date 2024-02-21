import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Training } from '../training/entities/training.entity';
import { Player } from './entities/player.entity';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;

  const mockPlayerRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
    })),
    save: jest
      .fn()
      .mockImplementation((training) =>
        Promise.resolve({ id: 1, ...training }),
      ),
    findOne: jest.fn().mockImplementation(() => undefined),
    delete: jest.fn().mockImplementation(() => ({
      raw: [],
      affected: 1,
    })),
  };

  const mockTrainingRepository = {
    delete: jest.fn().mockImplementation(() => ({
      raw: [],
      affected: 1,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
        {
          provide: getRepositoryToken(Training),
          useValue: mockTrainingRepository,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a player', async () => {
    const createTrainingDto = {
      name: 'John Doe',
    };

    expect(await service.createPlayer(createTrainingDto)).toEqual({
      id: 1,
      ...createTrainingDto,
    });

    const newPlayer = mockPlayerRepository.create(createTrainingDto);

    expect(await mockPlayerRepository.save(newPlayer)).toEqual({
      id: 1,
      ...newPlayer,
    });
  });

  it('should remove a player', async () => {
    expect(await service.remove(1)).toEqual({
      raw: [],
      affected: 1,
    });
  });
});
