"use server";

import { auth } from "@clerk/nextjs/server";
import { connectDB } from "../mongoDB";
import { Customer, Collection, Order, Product } from "../models";

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
    const monthIndex = new Date(order.createdAt).getMonth();
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;

    return acc;
  }, {});

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i)
    );

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

export const getCustomers = async () => {
  await connectDB();
  const customers = await Customer.find();
  return customers;
};

export const getOrders = async () => {
  await connectDB();

  const orders = await Order.find().sort({ createdAt: "desc" }).populate({
    path: "products.product",
    model: "Product",
  });

  const orderDetails = await Promise.all(
    orders.map(async (order) => {
      const customer = await Customer.findOne({
        clerkId: order.customerClerkId,
      });

      const firstProduct = order.products[0];
      const productImage = firstProduct.product.media[0];

      return {
        _id: order._id,
        customer: customer.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        productImage: productImage,
      };
    })
  );

  return orderDetails;
};

export const getOrderDetails = async (orderId: string) => {
  await connectDB();

  const order = await Order.findById(orderId).populate({
    path: "products.product",
    model: Product,
  });

  if (!order) {
    throw new Error("Order Not Found");
  }
  return order;
};
