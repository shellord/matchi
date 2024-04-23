import Game from "./game";
import generateGame from "@/lib/game";
import { kv } from "@vercel/kv";

const Room = async ({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) => {
  let dimension: number;
  let grid: number[][] = [];

  const redisData = await kv.get(roomId);

  if (!redisData) {
    const { dimension: dim, grid: g } = generateGame(4);
    dimension = dim;
    grid = g;
    await kv.set(roomId, JSON.stringify({ dimension, grid }));
  } else {
    const { dimension: dim, grid: g } = redisData as {
      dimension: number;
      grid: number[][];
    };
    dimension = dim;
    grid = g;
  }

  return <Game roomId={roomId} dimension={dimension} grid={grid} />;
};

export default Room;
