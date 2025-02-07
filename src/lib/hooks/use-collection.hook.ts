import { useMutation, useQuery } from "@tanstack/react-query";
import { collectionApi } from "../services";
import { createCollection } from "../actions";
import queryClient from "../query-client";
import { queries } from "~/lib/constants";

export function useCollections() {
  return useQuery({
    ...queries.collections.all,
    queryFn: () => collectionApi.getCollections(),
  });
}

export const useCreateCollection = () => {
  return useMutation({
    mutationFn: createCollection,
    onMutate: async (newCollection) => {
      await queryClient.cancelQueries(queries.collections.all);

      const previousCollections = queryClient.getQueryData<CollectionType[]>(
        queries.collections.all.queryKey
      );

      const tempId = `temp-${Date.now()}`;

      const optimisticCollection: CollectionType = {
        _id: tempId,
        title: newCollection.title,
        description: newCollection.description,
        image: newCollection.image,
        products: [],
      };

      queryClient.setQueryData<CollectionType[]>(
        queries.collections.all.queryKey,
        (oldData) => {
          console.log(oldData);
          return oldData
            ? [optimisticCollection, ...oldData]
            : [optimisticCollection];
        }
      );

      return { previousCollections };
    },

    onError: (err, newCollection, context) => {
      queryClient.setQueryData(
        queries.collections.all.queryKey,
        context?.previousCollections
      );
    },

    onSuccess: (data) => {
      queryClient.setQueryData<CollectionType[]>(
        queries.collections.all.queryKey,
        (oldData) => {
          console.log(oldData);
          return oldData?.map((collection) =>
            collection._id.startsWith("temp-") ? data.data : collection
          );
        }
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(queries.collections.all);
    },
  });
};

export const useUpdateCollection = () => {
  return useMutation({
    mutationFn: collectionApi.updateCollection,
    onMutate: async (updatedCollection) => {
      await queryClient.cancelQueries(queries.collections.all);

      const previousCollections = queryClient.getQueryData<CollectionType[]>(
        queries.collections.all.queryKey
      );

      queryClient.setQueryData<CollectionType[]>(
        queries.collections.all.queryKey,
        (oldData) => {
          return oldData?.map((collection) =>
            collection._id === updatedCollection._id
              ? updatedCollection
              : collection
          );
        }
      );

      return { previousCollections };
    },

    onError: (err, updatedCollection, context) => {
      queryClient.setQueryData(
        queries.collections.all.queryKey,
        context?.previousCollections
      );
    },

    onSettled: (data, error, updatedCollection) => {
      queryClient.invalidateQueries(queries.collections.all);

      queryClient.invalidateQueries(
        queries.collections.detail(updatedCollection._id)
      );
    },
  });
};

export const useDeleteCollection = () => {
  return useMutation({
    mutationFn: collectionApi.deleteCollection,
    onMutate: async (collectionId: string) => {
      await queryClient.cancelQueries(queries.collections.all);

      const previousCollections = queryClient.getQueryData<CollectionType[]>(
        queries.collections.all.queryKey
      );

      queryClient.setQueryData<CollectionType[]>(
        queries.collections.all.queryKey,
        (oldData) => {
          return oldData?.filter(
            (collection) => collection._id !== collectionId
          );
        }
      );

      return { previousCollections, collectionId };
    },

    onError: (err, collectionId, context) => {
      queryClient.setQueryData(
        queries.collections.all.queryKey,
        context?.previousCollections
      );
    },

    onSettled: (data, error, collectionId) => {
      queryClient.removeQueries(queries.collections.detail(collectionId));

      queryClient.invalidateQueries(queries.collections.all);
    },
  });
};

export const useCollectionDetails = (collectionId: string) => {
  return useQuery(queries.collections.detail(collectionId));
};
