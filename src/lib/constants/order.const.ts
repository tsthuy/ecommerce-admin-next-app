import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getOrderDetails } from "../actions";

export const orders = createQueryKeys("orders", {
  all: null,
  detail: (orderId: string) => ({
    queryKey: [orderId],
    queryFn: () => getOrderDetails(orderId),
  }),
});
