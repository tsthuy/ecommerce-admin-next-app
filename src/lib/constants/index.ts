import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { collections } from "./collection.const";
import { products } from "./product.const";
import { customers } from "./customer.const";
import { orders } from "./order.const";

export const queries = mergeQueryKeys(collections, products, customers, orders);
