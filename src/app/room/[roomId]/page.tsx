import Game from "./game";
import generateGame from "@/lib/game";
import client from "@/lib/redis";

const Room = async ({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) => {
  let dimension: number;
  let grid: number[][] = [];

  if (!client.isReady) {
    await client.connect();
  }

  const redisData = (await client.get(roomId)) as string;

  if (!redisData) {
    const { dimension: dim, grid: g } = generateGame(4);
    dimension = dim;
    grid = g;
    await client.set(roomId, JSON.stringify({ dimension, grid }));
  } else {
    const { dimension: dim, grid: g } = JSON.parse(redisData);
    dimension = dim;
    grid = g;
  }

  client.disconnect();

  return <Game roomId={roomId} dimension={dimension} grid={grid} />;
};

export default Room;
