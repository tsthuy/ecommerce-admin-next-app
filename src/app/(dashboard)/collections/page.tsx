"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Loader } from "~/components/custom-ui";
import { Button } from "~/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "~/components/custom-ui/data-table";
import { columns } from "~/components/collections";
import { useCollections } from "~/lib/hooks";

const Collections = () => {
  const { data: collections, isLoading } = useCollections();
  const router = useRouter();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={collections || []} searchKey="title" />
    </div>
  );
};

export default Collections;
