import Button from "@/components/button";
import React from "react";

type Props = {
  name: string;
  isReady: boolean;
  isCurrentPlayer: boolean;
  onClickReady: () => void;
  score: number;
  isWin: boolean;
  rank: number;
};

const UserItem: React.FC<Props> = ({
  name,
  isReady,
  isCurrentPlayer,
  onClickReady,
  score,
  isWin,
  rank,
}) => {
  return (
    <div className="bg-slate-800 p-1 flex items-center gap-5 text-sm h-10">
      <p>{name}</p>
      {isReady && <p>Ready</p>}
      {!isCurrentPlayer && !isReady && <p>Not Ready</p>}
      {isCurrentPlayer && !isReady && (
        <Button onClick={onClickReady}>Ready</Button>
      )}
      <p>Score: {score}</p>
      {isWin && <p className="text-green-500">Solved</p>}
      {rank && <p className="text-green-500">#{rank}</p>}
    </div>
  );
};

export default UserItem;
