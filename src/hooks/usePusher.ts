import { pusherClient } from "@/lib/pusher";
import { User } from "@/types/common";
import { PresenceChannel } from "pusher-js";
import React from "react";

const usePusher = (roomId: string) => {
  const channel = React.useRef<PresenceChannel>();
  const [users, setUsers] = React.useState<User[]>([]);
  const [me, setMe] = React.useState<{
    id: string;
  } | null>(null);

  const updateUser = (userId: string, data: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.user_id === userId) {
          return {
            ...user,
            ...data,
          };
        }
        return user;
      })
    );
  };

  React.useEffect(() => {
    channel.current = pusherClient.subscribe(
      `presence-cache-room-${roomId}`
    ) as PresenceChannel;

    channel.current.bind(
      "pusher:subscription_succeeded",
      (members: PresenceChannel["members"]) => {
        const connectedUsers: User[] = [];
        for (const socketId in members.members) {
          connectedUsers.push(members.members[socketId]);
        }
        setUsers(connectedUsers);
        setMe(members.me);
      }
    );

    channel.current.bind(
      "pusher:member_added",
      (member: PresenceChannel["members"]["members"]) => {
        setUsers((prev) => [...prev, member.info]);
      }
    );

    channel.current.bind(
      "pusher:member_removed",
      (member: PresenceChannel["members"]["members"]) => {
        setUsers((prev) =>
          prev.filter((user) => user.user_id !== member.info.user_id)
        );
      }
    );

    channel.current.bind("client-update-user", (data: User) => {
      updateUser(data.user_id, {
        ...data,
      });
    });

    return () => {
      channel.current?.unbind_all();
      channel.current?.unsubscribe();
    };
  }, [roomId]);

  const handleUserReady = (user_id: string) => {
    channel.current?.trigger("client-update-user", { user_id, isReady: true });
    updateUser(user_id, {
      isReady: true,
    });
  };

  const updateScore = (user_id: string, score: number) => {
    channel.current?.trigger("client-update-user", { user_id, score });
    updateUser(user_id, {
      score,
    });
  };

  return { me, users, channel, handleUserReady, updateScore };
};

export default usePusher;
