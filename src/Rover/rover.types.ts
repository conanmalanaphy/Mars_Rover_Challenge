export enum Direction {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
}

export enum Command {
  TURN_LEFT = "L",
  TURN_RIGHT = "R",
  MOVE_FORWARD = "M",
}

export type Rovers = {
  x: number;
  y: number;
  direction: Direction;
};

export interface MaxTerrainSize {
  x: number;
  y: number;
}
