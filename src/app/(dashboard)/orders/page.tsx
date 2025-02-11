"use client";

import { Separator } from "@radix-ui/react-separator";
import { Loader } from "~/components/custom-ui";
import { DataTable } from "~/components/custom-ui/data-table";
import { columns } from "~/components/orders/order-column";
import { useOrders } from "~/lib/hooks/use-order.hook";

const Orders = () => {
  const { data: orders, isLoading } = useOrders();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default Orders;
