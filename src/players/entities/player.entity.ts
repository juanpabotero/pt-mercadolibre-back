import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'numeric', default: 0 })
  score: number;
}
