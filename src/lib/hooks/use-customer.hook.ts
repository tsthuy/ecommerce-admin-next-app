import { useSuspenseQuery } from "@tanstack/react-query";
import { queries } from "../constants";
import { getCustomers } from "../actions";

export function useCustomers() {
  return useSuspenseQuery({
    ...queries.customers.all,
    queryFn: () => getCustomers(),
  });
}
