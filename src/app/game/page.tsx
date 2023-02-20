import React from "react";
import Grid from "./grid";
import generateGame from "@/lib/game";

const Game = () => {
  const { grid, dimension } = generateGame(4);

  return (
    <div className="w-full">
      <Grid dimension={dimension} grid={grid} />
    </div>
  );
};

export default Game;
