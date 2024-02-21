import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Player } from '../players/entities/player.entity';
import { PlayersService } from '../players/players.service';
import { Training } from './entities/training.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

describe('TrainingController', () => {
  let controller: TrainingController;

  const today = moment().utc().format('YYYY-MM-DD');
  const mockTrainingRepository = {
    create: jest.fn().mockImplementation((dto) => ({
      player_id: 1,
      created_at: today,
      score: 7.3,
      ...dto,
    })),
    save: jest
      .fn()
      .mockImplementation((training) =>
        Promise.resolve({ id: 1, ...training }),
      ),
  };

  const mockPlayerRepository = {
    findOne: jest.fn().mockImplementation(() => ({
      id: 1,
      name: 'John Doe',
    })),
    save: jest
      .fn()
      .mockImplementation((training) =>
        Promise.resolve({ id: 1, ...training }),
      ),
  };

  const mockTrainingService = {
    createTraining: jest.fn(() => ({
      message: 'Training created successfully',
    })),
  };

  const mockPLayerService = {
    getPlayerById: jest.fn(() => ({
      id: 1,
      name: 'John Doe',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [
        TrainingService,
        PlayersService,
        {
          provide: getRepositoryToken(Training),
          useValue: mockTrainingRepository,
        },
        {
          provide: getRepositoryToken(Player),
          useValue: mockPlayerRepository,
        },
      ],
    })
      .overrideProvider([TrainingService, PlayersService])
      .useValue([mockTrainingService, mockPLayerService])
      .compile();

    controller = module.get<TrainingController>(TrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a training', () => {
    const createTrainingDto = {
      players: [
        {
          id: 1,
          name: 'John Doe',
          stats: [
            {
              speed: { distance: '10', time: '10' },
              power: '10',
              passes: '10',
            },
          ],
        },
      ],
    };

    expect(controller.createTraining(createTrainingDto)).resolves.toEqual({
      message: 'Training created successfully',
    });
  });
});
