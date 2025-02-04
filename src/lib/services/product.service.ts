import { defaultApiClient } from "./axios-custom.service";

export const productApi = {
  getProducts: (): Promise<ProductType[]> => defaultApiClient.get(`products`),

  getProduct: (productId: string): Promise<ProductType> =>
    defaultApiClient.get(`products/${productId}`),

  updateProduct: (product: ProductType): Promise<ProductType> =>
    defaultApiClient.post(`products/${product._id}`, product),

  deleteProduct: (productId: string): Promise<void> =>
    defaultApiClient.delete(`products/${productId}`),
};
