import { NextRequest, NextResponse } from "next/server";
import { Product } from "~/lib/models";
import { connectDB } from "~/lib/mongoDB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections } },
      ],
      _id: { $ne: product._id }, // Exclude the current product
    });

    if (!relatedProducts) {
      return new NextResponse(
        JSON.stringify({ message: "No related products found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(relatedProducts, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[related_GET", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
