import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

describe('TeamController', () => {
  let controller: TeamController;

  const mockTeamService = {
    getTeam: jest.fn(() => ({
      players: [
        {
          id: 2,
          name: 'player 2',
          score: 500,
        },
        {
          id: 1,
          name: 'player 1',
          score: 300,
        },
      ],
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [TeamService],
    })
      .overrideProvider(TeamService)
      .useValue(mockTeamService)
      .compile();

    controller = module.get<TeamController>(TeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return players', () => {
    expect(controller.getTeam()).toEqual({
      players: [
        {
          id: 2,
          name: 'player 2',
          score: 500,
        },
        {
          id: 1,
          name: 'player 1',
          score: 300,
        },
      ],
    });

    expect(mockTeamService.getTeam).toHaveBeenCalled();
  });
});
