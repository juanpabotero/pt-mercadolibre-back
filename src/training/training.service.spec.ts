import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { Training } from './entities/training.entity';
import { TrainingService } from './training.service';

describe('TrainingService', () => {
  let service: TrainingService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingService,
        {
          provide: getRepositoryToken(Training),
          useValue: mockTrainingRepository,
        },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a training', async () => {
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

    expect(await service.createTraining(createTrainingDto)).toEqual({
      message: 'Training created successfully',
    });

    const newPlayer = mockTrainingRepository.create(
      createTrainingDto.players[0],
    );

    expect(await mockTrainingRepository.save(newPlayer)).toEqual({
      id: 1,
      ...newPlayer,
    });
  });
});
