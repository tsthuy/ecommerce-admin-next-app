import { defaultApiClient } from "./axios-custom.service";

export const collectionApi = {
  getCollections: (): Promise<CollectionType[]> =>
    defaultApiClient.get(`collections`),

  getCollection: (collectionId: string): Promise<CollectionType> =>
    defaultApiClient.get(`collections/${collectionId}`),

  updateCollection: (collection: CollectionType): Promise<CollectionType> =>
    defaultApiClient.post(`collections/${collection._id}`, collection),

  deleteCollection: (collectionId: string): Promise<void> =>
    defaultApiClient.delete(`collections/${collectionId}`),
};
