"use client";

import CollectionForm from "~/components/collections/collection-form";
import Loader from "~/components/custom-ui/loader";
import { useCollectionDetails } from "~/lib/hooks";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const { data: collectionDetails, isLoading } = useCollectionDetails(
    params.collectionId
  );

  return isLoading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;
