"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import {
  useCollections,
  useDeleteCollection,
} from "~/lib/hooks/use-collection.hook";
import Loader from "~/components/custom-ui/loader";
import { Button } from "~/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import Link from "next/link";

const Collections = () => {
  const router = useRouter();

  // Use the custom hook to fetch collections
  const { data: collections, isLoading, isError } = useCollections();
  const { mutate: deleteCollection } = useDeleteCollection();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching collections</div>;
  }

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          className="bg-primary text-white"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      {collections &&
        collections.map((collection) => (
          <div key={collection._id} className="border border-red-500 my-2">
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              className="bg-white p-4 w-[100%] block rounded-md shadow-md "
            >
              Details
            </Link>

            <div className="flex justify-around">
              <div className="px-5">
                <p className="text-heading3-bold font-bold">
                  Title: {collection.title}
                </p>
                <p className="text-heading4">Des: {collection.description}</p>
              </div>
              <Image
                width={40}
                height={40}
                src={collection.image}
                alt={collection.title}
              />
              <Button
                onClick={() => deleteCollection(collection._id)}
                type="button"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Collections;
