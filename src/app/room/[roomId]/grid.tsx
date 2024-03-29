"use client";

import React from "react";
import clsx from "clsx";

type TGrid = {
  dimension: number;
  grid: number[][];
  onMatch: (count: number) => void;
};

type TCard = {
  value: number;
  onFlip: () => void;
  isFlipped: boolean;
};

const Card: React.FC<TCard> = ({ value, onFlip, isFlipped }) => {
  return (
    <button
      className={clsx(
        `flex flex-1 border border-blue-900 transition-transform flip-card`,
        {
          flipped: isFlipped,
        }
      )}
      onClick={onFlip}
    >
      <div className="flip-card-front bg-slate-900" />
      <div className="flip-card-back bg-blue-900 flex justify-center items-center">
        {value}
      </div>
    </button>
  );
};

const Grid: React.FC<TGrid> = ({ dimension = 4, grid, onMatch }) => {
  const [matchedItems, setMatchedItems] = React.useState<number[]>([]);
  const [flippedItems, setFlippedItems] = React.useState<number[]>([]);
  const [isDisableClick, setIsDisableClick] = React.useState(false);

  const visibleItems = flippedItems.concat(matchedItems);
  const gameWon = matchedItems.length === dimension * dimension;

  const indexToRowCol = (index: number) => {
    const row = Math.floor(index / dimension);
    const col = index % dimension;
    return [row, col];
  };

  const onFlipCard = (index: number) => {
    if (isDisableClick || visibleItems.includes(index)) return;

    setFlippedItems((prev) => [...prev, index]);

    if (flippedItems.length === 1) {
      setIsDisableClick(true);
      const [firstIndex] = flippedItems;
      const [firstRow, firstCol] = indexToRowCol(firstIndex);
      const [secondRow, secondCol] = indexToRowCol(index);

      const isMatch = grid[firstRow][firstCol] === grid[secondRow][secondCol];

      setTimeout(() => {
        if (isMatch) {
          setMatchedItems((prev) => [...prev, firstIndex, index]);
          onMatch(matchedItems.length / 2 + 1);
        }

        setFlippedItems([]);
        setIsDisableClick(false);
      }, 500);
    }
  };

  return (
    <section className="flex flex-1">
      {grid.map((row, rowIndex) => {
        return (
          <div className="flex flex-1 flex-col" key={rowIndex}>
            {row.map((value, colIndex) => {
              const itemIndex = rowIndex * dimension + colIndex;
              return (
                <Card
                  value={value}
                  key={itemIndex}
                  onFlip={() => onFlipCard(itemIndex)}
                  isFlipped={visibleItems.includes(itemIndex)}
                />
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default Grid;
