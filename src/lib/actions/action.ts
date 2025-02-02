"use server";

import { auth } from "@clerk/nextjs/server";
import Customer from "../models/customer.model";
import Order from "../models/order.model";
import { connectDB } from "../mongoDB";
import Collection from "../models/collection.model";

export const getTotalSales = async () => {
  await connectDB();
  const orders = await Order.find();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );
  return { totalOrders, totalRevenue };
};

export const getTotalCustomers = async () => {
  await connectDB();
  const customers = await Customer.find();
  const totalCustomers = customers.length;
  return totalCustomers;
};

export const getSalesPerMonth = async () => {
  await connectDB();
  const orders = await Order.find();

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc;
  }, {});

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i)
    );
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 };
  });

  return graphData;
};

export const createCollection = async (formData: {
  title: string;
  description: string;
  image: string;
}) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    await connectDB();

    const { title, description, image } = formData;

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      throw new Error("Collection already exists");
    }

    if (!title || !image) {
      throw new Error("Title and image are required");
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return { success: true, data: newCollection };
  } catch (err) {
    console.error("[collections_POST]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};
