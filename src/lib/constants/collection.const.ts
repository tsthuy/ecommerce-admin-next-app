import { createQueryKeys } from "@lukemorales/query-key-factory";
import { collectionApi } from "../services/collection.service";

export const collections = createQueryKeys("collections", {
  all: null,
  detail: (collectionId: string) => ({
    queryKey: [collectionId],
    queryFn: () => collectionApi.getCollection(collectionId),
  }),
});
