import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

describe('PlayersController', () => {
  let controller: PlayersController;

  const mockPLayersService = {
    createPlayer: jest.fn((dto) => ({
      id: 1,
      ...dto,
    })),
    findAllPlayers: jest.fn(() => ({
      players: [],
    })),
    getPlayerById: jest.fn((id) => ({
      id,
      name: 'John Doe',
    })),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    remove: jest.fn((id) => ({
      raw: [],
      affected: 1,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService],
    })
      .overrideProvider(PlayersService)
      .useValue(mockPLayersService)
      .compile();

    controller = module.get<PlayersController>(PlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new player', () => {
    const createPlayerDto = {
      name: 'John Doe',
    };

    expect(controller.create(createPlayerDto)).toEqual({
      id: 1,
      ...createPlayerDto,
    });
  });

  it('should find all players', () => {
    expect(controller.findAllPlayers()).toHaveProperty('players');
    expect(controller.findAllPlayers()).toEqual({ players: [] });
  });

  it('should find player by id', () => {
    expect(controller.getPlayerById('1')).toEqual({
      id: 1,
      name: 'John Doe',
    });
  });

  it('should remove player', () => {
    expect(controller.remove('1')).toHaveProperty('affected');
  });
});
