import { NextRequest, NextResponse } from "next/server";
import { Product } from "~/lib/models";
import { connectDB } from "~/lib/mongoDB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    await connectDB();

    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: params.query, $options: "i" } },
        { category: { $regex: params.query, $options: "i" } },
        { tags: { $in: [new RegExp(params.query, "i")] } }, // $in is used to match an array of values
      ],
    });

    return NextResponse.json(searchedProducts, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[search_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
