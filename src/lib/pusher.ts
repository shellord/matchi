import Pusher from "pusher";
import pusherJs from "pusher-js";

import {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
} from "@/utils/constants";

const pusherServer = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

const pusherClient = new pusherJs(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  authEndpoint: "/api/pusher/auth",
  authTransport: "ajax",
  auth: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export { pusherServer, pusherClient };
