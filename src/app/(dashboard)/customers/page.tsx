"use client";

import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "~/components/custom-ui/data-table";
import { columns } from "~/components/customers/customer-column";
import { useCustomers } from "~/lib/hooks/use-customer.hook";

const Customers = () => {
  const { data: customers } = useCustomers();

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={customers || []} searchKey="name" />
    </div>
  );
};

export default Customers;
