"use client";
import { createContext, useState } from "react";

interface ShoppingValue {
  productId: string;
  count: number;
  specValueId: string;
  unitPrice: number;
}
export const ShoppingContext = createContext<{
  value: ShoppingValue;
  setValue: (value: ShoppingValue) => void;
}>({
  value: {
    productId: "",
    count: 0,
    specValueId: "",
    unitPrice: 0,
  },
  setValue: () => {},
});

function ShoppingProvider({
  children,
  productId,
}: {
  children: React.ReactNode;
  productId: string;
}) {
  const [value, setValue] = useState({
    productId,
    count: 0,
    specValueId: "",
    unitPrice: 0,
  });

  return (
    <ShoppingContext.Provider value={{ value, setValue }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export default ShoppingProvider;
