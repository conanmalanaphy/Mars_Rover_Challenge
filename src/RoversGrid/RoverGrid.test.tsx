import { processRovers } from "./RoversGrid";

test("Correctly converts csv data into format needed", () => {
  // Arrange
  const csvData = [
    ["1 2 N", "LMLMLMLMM"],
    ["1 4 E", "RLM"],
  ];

  const expectRovers = [
    {
      commands: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      initialPosition: { direction: "N", x: 1, y: 2 },
    },
    {
      commands: ["R", "L", "M"],
      initialPosition: { direction: "E", x: 1, y: 4 },
    },
  ];
  // Act
  const processedRovers = processRovers(csvData);

  // Assert
  expect(expectRovers).toEqual(processedRovers);
});
