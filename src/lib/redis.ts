import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "@/utils/constants";

const client = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

export default client;
