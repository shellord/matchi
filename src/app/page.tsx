import React from "react";
import Button from "@/components/button";

const Home = () => {
  return (
    <section className="flex flex-1 items-center justify-center flex-col">
      <h1 className="text-5xl">Matchi</h1>
      <div className="mt-4" />
      <a href="/game">
        <Button>START</Button>
      </a>
    </section>
  );
};

export default Home;
