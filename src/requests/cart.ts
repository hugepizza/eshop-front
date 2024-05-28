import { api } from "./client";

export type CartItem = {
  featuredImageskuId: string;
  productId: string;
  skuId: string;
  productSlug: string;
  title: string;
  price: string;
  onSalePrice: string;
  featuredImage: string;
  stock: number;
  attributes: { key: string; value: string }[];
  count: number;
  freeshipping: boolean;
  total: string;
  subtotal: string;
};

async function get() {
  const resp = await api.get(`user/cart`, {
    cache: "no-cache",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnhrcnZjYzAwMDBzenhscnptZHRnd2QiLCJpYXQiOjE3MTY4NzkyMDgsImV4cCI6MTcxNzQ4NDAwOH0.kShKm_3NbEeV7CTebF-oQhoEUFCfYzQ-rt0uaqjk71M`,
    },
  });
  const data = await resp.json();
  return (
    data as {
      data: {
        items: CartItem[];
        total: string;
        subtotal: string;
      };
    }
  ).data;
}

async function update(skuId: string, quantity: number) {
  const resp = await api.post(`user/cart`, {
    json: {
      skuId,
      count: quantity,
    },
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnhrcnZjYzAwMDBzenhscnptZHRnd2QiLCJpYXQiOjE3MTY4NzkyMDgsImV4cCI6MTcxNzQ4NDAwOH0.kShKm_3NbEeV7CTebF-oQhoEUFCfYzQ-rt0uaqjk71M`,
    },
  });
  const data = await resp.json();
  return (
    data as {
      data: {
        items: CartItem[];
        total: string;
        subtotal: string;
      };
    }
  ).data;
}

export const CartApi = {
  get,
  update,
};
