import { useMutation, useQuery } from "@tanstack/react-query";
import { collections } from "./../constants";
import { collectionApi } from "../services";
import { createCollection } from "../actions";
import queryClient from "../query-client";

export function useCollections() {
  return useQuery({
    ...collections.all,
    queryFn: () => collectionApi.getCollections(),
  });
}

export const useCreateCollection = () => {
  return useMutation({
    mutationFn: createCollection,
    onMutate: async (newCollection) => {
      await queryClient.cancelQueries(collections.all);

      const previousCollections = queryClient.getQueryData<CollectionType[]>(
        collections.all.queryKey
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
        collections.all.queryKey,
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
        collections.all.queryKey,
        context?.previousCollections
      );
    },

    onSuccess: (data) => {
      queryClient.setQueryData<CollectionType[]>(
        collections.all.queryKey,
        (oldData) => {
          console.log(oldData);
          return oldData?.map((collection) =>
            collection._id.startsWith("temp-") ? data.data : collection
          );
        }
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(collections.all);
    },
  });
};

export const useUpdateCollection = () => {
  return useMutation({
    mutationFn: collectionApi.updateCollection,
    onMutate: async (updatedCollection) => {
      await queryClient.cancelQueries(collections.all);

      const previousCollections = queryClient.getQueryData<CollectionType[]>(
        collections.all.queryKey
      );

      queryClient.setQueryData<CollectionType[]>(
        collections.all.queryKey,
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
        collections.all.queryKey,
        context?.previousCollections
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(collections.all);
    },
  });
};

export const useDeleteCollection = () => {
  return useMutation({
    mutationFn: collectionApi.deleteCollection,
    onMutate: async (collectionId: string) => {
      await queryClient.cancelQueries(collections.all);

      const previousCollections = queryClient.getQueryData<CollectionType[]>(
        collections.all.queryKey
      );

      queryClient.setQueryData<CollectionType[]>(
        collections.all.queryKey,
        (oldData) => {
          return oldData?.filter(
            (collection) => collection._id !== collectionId
          );
        }
      );

      return { previousCollections };
    },

    onError: (err, collectionId, context) => {
      queryClient.setQueryData(
        collections.all.queryKey,
        context?.previousCollections
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(collections.all);
    },
  });
};
