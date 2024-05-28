"use client";
import { createContext, useState } from "react";

interface Sku {
  id: string;
  featuredImage: string;
  price: number;
  onSalePrice?: number | undefined;
  attributes: string[];
}
interface ShoppingValue {
  productId: string;
  count: number;
  hitSkuId?: string;
  onSalePrice?: number;
  price: number;
  skus: Sku[];
}
export const SpecSelectContext = createContext<{
  value: ShoppingValue;
  setValue: (value: ShoppingValue) => void;
}>({
  value: {
    productId: "",
    count: 0,
    hitSkuId: undefined,
    onSalePrice: undefined,
    price: 0,
    skus: [],
  },
  setValue: () => {},
});

function SpecSelectProvider({
  children,
  productId,
  price,
  onSalePrice,
  skus,
  hitSkuId,
}: {
  children: React.ReactNode;
  productId: string;
  price: number;
  onSalePrice?: number;
  skus: Sku[];
  hitSkuId: string;
}) {
  const [value, setValue] = useState<ShoppingValue>({
    productId,
    count: 1,
    hitSkuId,
    onSalePrice,
    price,
    skus,
  });

  return (
    <SpecSelectContext.Provider value={{ value, setValue }}>
      {children}
    </SpecSelectContext.Provider>
  );
}

export default SpecSelectProvider;
