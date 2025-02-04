import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { collections } from "./collection.const";
import { products } from "./product.const";

export const queries = mergeQueryKeys(collections, products);
