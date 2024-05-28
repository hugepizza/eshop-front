import { api } from "./client";

type Collection = {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  coverImage: string;
};

async function get(slug: string) {
  const resp = await api.get(`product/collection/${slug}?pageSize=0`);
  const data = await resp.json();
  return (data as { data: { collection: Collection } }).data.collection;
}

export const collectionApi = {
  get,
};
