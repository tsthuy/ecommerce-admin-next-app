import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { queries } from "./../constants";

export function useProducts() {
  return useQuery({
    ...queries.products.all,
    queryFn: () => productApi.getProducts(),
  });
}

export function useProduct(productId: string) {
  return useQuery(queries.products.detail(productId));
}
