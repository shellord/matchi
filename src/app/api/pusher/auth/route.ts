import { pusherServer } from "@/lib/pusher";
import { User } from "@/types/common";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const id = nanoid();

  type PresenceData = {
    user_id: string;
    user_info: User;
  };

  const presenceData: PresenceData = {
    user_id: id,
    user_info: { user_id: id, name: "John Doe", isReady: false, matches: 0 },
  };

  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    presenceData
  );

  return new Response(JSON.stringify(auth));
}