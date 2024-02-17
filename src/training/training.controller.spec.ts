import { Test, TestingModule } from '@nestjs/testing';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

describe('TrainingController', () => {
  let controller: TrainingController;

  const mockTrainingService = {
    createTraining: jest.fn(() => ({
      message: 'Training created successfully',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [TrainingService],
    })
      .overrideProvider(TrainingService)
      .useValue(mockTrainingService)
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

    expect(controller.createTraining(createTrainingDto)).toEqual({
      message: 'Training created successfully',
    });

    expect(mockTrainingService.createTraining).toHaveBeenCalledWith(
      createTrainingDto,
    );
  });
});
