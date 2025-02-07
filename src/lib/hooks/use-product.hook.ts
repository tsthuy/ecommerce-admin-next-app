import { useMutation, useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { queries } from "./../constants";
import queryClient from "../query-client";

export function useProducts() {
  return useQuery({
    ...queries.products.all,
    queryFn: () => productApi.getProducts(),
  });
}

export function useProduct(productId: string) {
  return useQuery(queries.products.detail(productId));
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: productApi.deleteProduct,
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries(queries.products.all);

      const previousCollections = queryClient.getQueryData<ProductType[]>(
        queries.products.all.queryKey
      );

      queryClient.setQueryData<ProductType[]>(
        queries.products.all.queryKey,
        (oldData) => {
          return oldData?.filter((product) => product._id !== productId);
        }
      );

      return { previousCollections, productId };
    },

    onError: (err, productId, context) => {
      queryClient.setQueryData(
        queries.products.all.queryKey,
        context?.previousCollections
      );
    },

    onSettled: (data, error, productId) => {
      queryClient.removeQueries(queries.products.detail(productId));

      queryClient.invalidateQueries(queries.products.all);
    },
  });
};
