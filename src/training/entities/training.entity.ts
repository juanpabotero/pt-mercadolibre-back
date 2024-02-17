import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Stat } from '../interfaces/player.interface';

@Entity('training')
export class Training {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric', nullable: true })
  player_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('text', { array: true })
  stats: Stat[];

  @Column({ type: 'numeric', default: 0 })
  score: number;
}
