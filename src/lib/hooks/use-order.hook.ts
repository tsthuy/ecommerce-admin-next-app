import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "../constants";
import { getOrders } from "../actions";

export const useOrders = () => {
  return useSuspenseQuery({
    ...queries.orders.all,
    queryFn: () => getOrders(),
  });
};

export const useOrderDetails = (orderId: string) => {
  return useQuery(queries.orders.detail(orderId));
};
