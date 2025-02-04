import { createQueryKeys } from "@lukemorales/query-key-factory";
import { productApi } from "../services/product.service";

export const products = createQueryKeys("products", {
  all: null,
  detail: (productId: string) => ({
    queryKey: [productId],
    queryFn: () => productApi.getProduct(productId),
  }),
});
