import { Command, MaxTerrainSize, Rovers } from "../Rover/rover.types";

export interface UndeployedRover {
  initialPosition: Rovers;
  commands: Command[];
}

export interface Data {
  data: string[][];
}

export type State = {
  existingRoversPosition: Rovers[];
  roversLeft: UndeployedRover[];
};

export type Action =
  | { type: "loaded_rovers"; payload: UndeployedRover[] }
  | { type: "change_rovers"; payload: Rovers };

export interface RoversGridProps {
  maxTerrainSize: MaxTerrainSize;
  csvAddress: string;
}
