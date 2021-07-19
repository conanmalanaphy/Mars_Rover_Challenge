import { Command, Direction, MaxTerrainSize, Rovers } from "./rover.types";

export const commandLeft = (direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return Direction.WEST;
    case Direction.SOUTH:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.NORTH;
    case Direction.WEST:
      return Direction.SOUTH;
    default:
      return direction;
  }
};

export const commandRight = (direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return Direction.EAST;
    case Direction.SOUTH:
      return Direction.WEST;
    case Direction.EAST:
      return Direction.SOUTH;
    case Direction.WEST:
      return Direction.NORTH;
    default:
      return direction;
  }
};

export const commandForward = (currentRoverPosition: Rovers) => {
  switch (currentRoverPosition.direction) {
    case Direction.NORTH:
      return {
        ...currentRoverPosition,
        y: currentRoverPosition.y + 1,
      };
    case Direction.SOUTH:
      return {
        ...currentRoverPosition,
        y: currentRoverPosition.y - 1,
      };
    case Direction.EAST:
      return {
        ...currentRoverPosition,
        x: currentRoverPosition.x + 1,
      };
    case Direction.WEST:
      return {
        ...currentRoverPosition,
        x: currentRoverPosition.x + 1,
      };
    default:
      return { ...currentRoverPosition };
  }
};

export const isDestinationOnMap = (state: Rovers, bounds: MaxTerrainSize) => {
  const newLocation = commandForward(state);

  const xMax = newLocation.x <= bounds.x && newLocation.x >= 0;
  const yMax = newLocation.y <= bounds.y && newLocation.y >= 0;

  return xMax && yMax;
};

export const isDestinationEmpty = (
  existingRoversPosition: Rovers[],
  currentRoverPosition: Rovers
) => {
  const newLocation = commandForward(currentRoverPosition);

  const alreadyRoverInSpot = existingRoversPosition.find((rover) => {
    return rover.x === newLocation.x && rover.y === newLocation.y;
  });

  return !alreadyRoverInSpot;
};

export function startRover(
  maxTerrainSize: MaxTerrainSize,
  initialPosition: Rovers,
  commands: Command[],
  existingRovers: Rovers[]
) {
  // Keep hold of the initial position in case their are no commands then we
  // can return the position
  let roverPosition = initialPosition;

  commands.forEach((command) => {
    if (command === Command.TURN_LEFT) {
      roverPosition = {
        ...roverPosition,
        direction: commandLeft(roverPosition.direction),
      };
    } else if (command === Command.TURN_RIGHT) {
      roverPosition = {
        ...roverPosition,
        direction: commandRight(roverPosition.direction),
      };
    } else if (command === Command.MOVE_FORWARD) {
      if (
        isDestinationOnMap(roverPosition, maxTerrainSize) &&
        isDestinationEmpty(existingRovers, roverPosition)
      ) {
        roverPosition = {
          ...commandForward(roverPosition),
        };
      }
    }
  });

  return roverPosition;
}

export default startRover;
