import { api } from "./client";

type SingleProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  onSalePrice?: number;
  featuredImage: string;
  attributes: {
    title: string;
    id: string;
    options: {
      id: string;
      text: string;
    }[];
  }[];
  skus: {
    id: string;
    featuredImage: string;
    price: number;
    onSalePrice?: number;
    attributes: string[];
    isDefault: boolean;
  }[];
};

type MultipleProducts = {
  items: {
    slug: string;
    title: string;
    price: number;
    onSalePrice?: number;
    featuredImage: string;
  }[];
};

async function get(slug: string) {
  const resp = await api.get(`product/${slug}`);
  const data = await resp.json();
  return (data as { data: SingleProduct }).data;
}

async function list(query: URLSearchParams) {
  const resp = await api.get(`product/search?` + query.toString());
  const data = await resp.json();
  return (data as { data: MultipleProducts }).data;
}

export const productApi = {
  get,
  list,
};
