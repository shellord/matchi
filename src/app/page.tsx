"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

const Home = () => {
  const router = useRouter();

  const onGameStart = () => {
    const randomRoomId = Math.random().toString(36).substring(7);
    router.push(`/room/${randomRoomId}`);
  };

  return (
    <section className="flex flex-1 items-center justify-center flex-col">
      <h1 className="text-5xl">Matchi</h1>
      <div className="mt-4" />
      <Button onClick={onGameStart}>START</Button>
    </section>
  );
};

export default Home;
