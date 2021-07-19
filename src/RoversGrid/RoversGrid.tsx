import Papa from "papaparse";
import React, { Dispatch, Reducer, useEffect, useReducer } from "react";
import startRover from "../Rover/rover";
import { Command, Direction } from "../Rover/rover.types";
import "./rover-grid.css";
import {
  Action,
  Data,
  RoversGridProps,
  State,
  UndeployedRover,
} from "./roverGrid.types";

export function processRovers(rovers: string[][]): UndeployedRover[] {
  return rovers.map((data) => {
    // The format of the data require us to split on different cases
    const [x, y, direction] = data[0].split(" ");
    const mainCommands = data[1].split("");

    return {
      initialPosition: {
        x: parseInt(x),
        y: parseInt(y),
        direction: direction as Direction,
      },
      commands: mainCommands as Command[],
    };
  });
}

async function fetchCsv(dispatch: Dispatch<Action>, csvAddress: string) {
  const response = await fetch(csvAddress);

  if (response.body != null) {
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);

    Papa.parse(csv, {
      skipEmptyLines: true,
      complete: ({ data }: Data) => {
        dispatch({
          type: "loaded_rovers",
          payload: processRovers(data),
        });
      },
    });
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loaded_rovers":
      return {
        ...state,
        roversLeft: action.payload,
      };
    case "change_rovers":
      return {
        ...state,
        roversLeft: [...state.roversLeft.slice(1)],
        existingRoversPosition: [
          ...state.existingRoversPosition,
          action.payload,
        ],
      };
  }
}

function RoversGrid({ maxTerrainSize, csvAddress }: RoversGridProps) {
  const [{ existingRoversPosition, roversLeft }, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, {
    existingRoversPosition: [],
    roversLeft: [],
  });

  // Go off and load the data from the Local CSV file, reload if the location changes
  useEffect(() => {
    fetchCsv(dispatch, csvAddress);
  }, [csvAddress]);

  if (roversLeft.length > 0) {
    // Process the rovers one by one taking the rover from left of the list
    const currentRover = roversLeft[0];

    const roverFinalPosition = startRover(
      maxTerrainSize,
      currentRover.initialPosition,
      currentRover.commands,
      existingRoversPosition
    );

    dispatch({ type: "change_rovers", payload: roverFinalPosition });
  }

  return (
    <div className="App">
      {[...Array.from({ length: maxTerrainSize.y }, (e, i) => i)]
        .reverse()
        .map((y, i) => {
          return (
            <div className="container" key={`row-${y}`}>
              {[...Array(maxTerrainSize.x)].map((e, x) => {
                const roverNumber = existingRoversPosition.findIndex(
                  (rover) => {
                    return rover.x === x && rover.y === y;
                  }
                );

                return roverNumber !== -1 ? (
                  <div className="cell occupied" key={`row-${y}-col-${x}`}>
                    Rover {roverNumber + 1}
                  </div>
                ) : (
                  <div className="cell" key={`row-${y}-col-${x}`}>
                    {`(${x}, ${y})`}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default RoversGrid;
