import Sale from "@/components/Sale";
import currency from "currency.js";

function Price({
  price,
  onSalePrice,
}: {
  price: number;
  onSalePrice?: number;
}) {
  return (
    <div className="flex flex-row items-center justify-start w-full gap-2">
      {onSalePrice ? (
        <div className="line-through text-sm">
          {currency(price).format({ symbol: "HK$" })}
        </div>
      ) : (
        <div>{currency(price).format({ symbol: "HK$" })}</div>
      )}
      {onSalePrice && (
        <>
          <div>{currency(onSalePrice).format({ symbol: "HK$" })}</div>
          <Sale />
        </>
      )}
    </div>
  );
}

export default Price;