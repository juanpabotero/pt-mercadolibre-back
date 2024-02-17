import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Training } from '../training/entities/training.entity';
import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  const select = jest.fn().mockReturnThis();
  const where = jest.fn().mockReturnThis();
  const groupBy = jest.fn().mockReturnThis();
  const orderBy = jest.fn().mockReturnThis();
  const getRawMany = jest.fn().mockReturnValueOnce([
    { count: '14', created_at: '2024-02-17T05:00:00.000Z' },
    { count: '4', created_at: '2024-02-15T05:00:00.000Z' },
  ]);

  const mockTrainingRepository = {
    createQueryBuilder: jest.fn(() => ({
      select,
      where,
      groupBy,
      orderBy,
      getRawMany,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Training),
          useValue: mockTrainingRepository,
        },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get team', async () => {
    expect(await service.getTeam()).toEqual({
      message: 'There is not enough information',
    });
    // const players = {
    //   players: [
    //     {
    //       id: 2,
    //       name: 'player 2',
    //       score: 500,
    //     },
    //     {
    //       id: 1,
    //       name: 'player 1',
    //       score: 300,
    //     },
    //   ],
    // };

    // expect(await service.getTeam()).toEqual({
    //   players,
    // });
  });
});
