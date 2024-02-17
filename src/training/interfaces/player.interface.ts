export interface IPLayer {
  id: number;
  name: string;
  stats: Stat[];
}

export interface Stat {
  power: string;
  speed: Speed;
  passes: string;
}

export interface Speed {
  distance: string;
  time: string;
}
