import Order from "../models/order.model";
import { connectDB } from "../mongoDB";

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
