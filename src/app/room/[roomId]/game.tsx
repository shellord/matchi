"use client";

import React from "react";
import Grid from "./grid";
import { TGrid } from "@/types/common";
import usePusher from "@/hooks/usePusher";
import UserItem from "./user-item";

type Props = {
  roomId: string;
} & TGrid;

const Game: React.FC<Props> = ({ roomId, dimension, grid }) => {
  const { me, users, handleUserReady, updateScore } = usePusher(roomId);

  const isAllReady = users.length > 0 && users.every((user) => user.isReady);

  const onMatch = (score: number) => {
    updateScore(me?.id as string, score);
  };

  return (
    <div className="flex flex-1 flex-col h-full w-full">
      <div className="w-full flex flex-1 ">
        {isAllReady ? (
          <Grid dimension={dimension} grid={grid} onMatch={onMatch} />
        ) : (
          <div className="flex flex-1 justify-center items-center">
            Waiting for other players to be ready...
          </div>
        )}
      </div>
      <div className="mt-10" />
      <p>Players</p>
      <hr />
      <ul className="h-56 overflow-auto">
        {users.map((user) => (
          <li key={user.user_id}>
            <div className="mt-3" />
            <UserItem
              name={user.name}
              isReady={user.isReady}
              isCurrentPlayer={user.user_id === me?.id}
              onClickReady={() => handleUserReady(user.user_id)}
              score={user.score}
              isWin={user.score === (dimension * dimension) / 2}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
