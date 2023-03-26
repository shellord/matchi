import { pusherServer } from "@/lib/pusher";
import { User } from "@/types/common";

export async function POST(req: Request) {
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  type PresenceData = {
    user_id: string;
    user_info: User;
  };

  const presenceData: PresenceData = {
    user_id: id,
    user_info: { user_id: id, name: "John Doe", isReady: false, score: 0 },
  };

  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    presenceData
  );

  return new Response(JSON.stringify(auth));
}
