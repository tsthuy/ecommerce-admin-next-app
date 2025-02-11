import { defaultApiClient } from "./axios-custom.service";

export const customerApi = {
  getCustomers: (): Promise<CustomerType[]> =>
    defaultApiClient.get("/customers"),
};
