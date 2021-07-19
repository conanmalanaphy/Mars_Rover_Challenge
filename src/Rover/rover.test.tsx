import startRover, {
  commandForward,
  commandLeft,
  commandRight,
  isDestinationEmpty,
  isDestinationOnMap,
} from "./rover";
import { Command, Direction, Rovers } from "./rover.types";

describe("Commands", () => {
  it("turns Left", () => {
    // Arrange
    const startingDirection = Direction.EAST;
    const endDirection = Direction.NORTH;

    // Act
    const proccesedRovers = commandLeft(startingDirection);

    // Assert
    expect(proccesedRovers).toEqual(endDirection);
  });

  it("turns Right", () => {
    // Arrange
    const startingDirection = Direction.EAST;
    const endDirection = Direction.SOUTH;

    // Act
    const proccesedRovers = commandRight(startingDirection);

    // Assert
    expect(proccesedRovers).toEqual(endDirection);
  });

  it("goes Forward", () => {
    // Arrange
    const startingPosition = {
      x: 1,
      y: 1,
      direction: Direction.EAST,
    };

    const endPosition = {
      x: 2,
      y: 1,
      direction: Direction.EAST,
    };
    // Act
    const proccesedRovers = commandForward(startingPosition);

    // Assert
    expect(proccesedRovers).toEqual(endPosition);
  });
});

test("Position will be off the map", () => {
  // Arrange
  const startingPosition = {
    x: 5,
    y: 1,
    direction: Direction.EAST,
  };

  const bounds = { x: 5, y: 5 };

  // Act
  const proccesedRovers = isDestinationOnMap(startingPosition, bounds);

  // Assert
  expect(proccesedRovers).toBe(false);
});

test("Existing Rover blocking the path", () => {
  // Arrange
  const startingPosition = {
    x: 5,
    y: 1,
    direction: Direction.EAST,
  };

  const existingRoversPosition = [
    {
      x: 6,
      y: 1,
      direction: Direction.EAST,
    },
  ];

  // Act
  const proccesedRovers = isDestinationEmpty(
    existingRoversPosition,
    startingPosition
  );

  // Assert
  expect(proccesedRovers).toBe(false);
});

test("Rover will turn Left and move", () => {
  // Arrange
  const maxTerrainSize = { x: 5, y: 5 };
  const initialPosition = {
    x: 1,
    y: 1,
    direction: Direction.EAST,
  };
  const commands: Command[] = [Command.TURN_LEFT, Command.MOVE_FORWARD];
  const existingRovers: Rovers[] = [];

  const finalPosition = {
    x: 1,
    y: 2,
    direction: Direction.NORTH,
  };

  // Act
  const proccesedRovers = startRover(
    maxTerrainSize,
    initialPosition,
    commands,
    existingRovers
  );

  // Assert
  expect(proccesedRovers).toEqual(finalPosition);
});
