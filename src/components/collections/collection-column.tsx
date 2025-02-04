"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Delete } from "../custom-ui";
import Image from "next/image";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Image
          src={row.original.image}
          alt={row.original.title}
          width={80}
          height={80}
          className="rounded-md"
        />
        <Link
          href={`/collections/${row.original._id}`}
          className="hover:text-red-1 font-bold"
        >
          {row.original.title}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
