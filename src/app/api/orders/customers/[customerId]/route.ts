import { NextRequest, NextResponse } from "next/server";
import { Order, Product } from "~/lib/models";
import { connectDB } from "~/lib/mongoDB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    await connectDB();

    const orders = await Order.find({
      customerClerkId: params.customerId,
    }).populate({ path: "products.product", model: Product });

    return NextResponse.json(orders, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[customerId_GET", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";
