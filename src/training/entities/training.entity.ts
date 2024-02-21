import { Player } from '../../players/entities/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stat } from '../interfaces/player.interface';

@Entity('training')
export class Training {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', nullable: true })
  training_id: string;

  @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('jsonb', { nullable: true })
  stats: Stat[];

  @Column({ type: 'numeric', default: 0 })
  score: number;

  @ManyToOne(() => Player, (player) => player.training)
  player: Player;
}
