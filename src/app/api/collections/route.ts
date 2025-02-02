import { NextResponse } from "next/server";
import Collection from "~/lib/models/collection.model";
import { connectDB } from "~/lib/mongoDB";

export const GET = async () => {
  try {
    await connectDB();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
