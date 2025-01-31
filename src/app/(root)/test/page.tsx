"use client";
import { connectDB } from "~/lib/mongoDB";

export default function Test() {
  const connect = async () => {
    await connectDB();
  };

  return (
    <div>
      <button onClick={() => connect}>Connect</button>
      <h1 className=" ">Hello, world!</h1>
    </div>
  );
}
