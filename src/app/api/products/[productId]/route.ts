import { NextRequest, NextResponse } from "next/server";
import { Collection, Product } from "~/lib/models";
import { connectDB } from "~/lib/mongoDB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
