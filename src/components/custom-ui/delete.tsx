"use client";

import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useDeleteCollection } from "~/lib/hooks";
import { useDeleteProduct } from "~/lib/hooks/use-product.hook";
import { useRouter } from "next/navigation";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const router = useRouter();

  const deleteCollectionMutation = useDeleteCollection();
  const deleteProductMutation = useDeleteProduct();
  const mutation =
    item === "product" ? deleteProductMutation : deleteCollectionMutation;

  const onDelete = async () => {
    try {
      await mutation.mutateAsync(id);

      toast.success(`${item} deleted`);

      const itemType = item === "product" ? "products" : "collections";
      router.push(`/${itemType}`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-500 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-1 text-white"
            onClick={onDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
