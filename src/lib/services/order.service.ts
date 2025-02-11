import { defaultApiClient } from "./axios-custom.service";

export const orderApi = {
  getOrderDetails: (orderId: string) =>
    defaultApiClient.get(`/orders/${orderId}`),
};
