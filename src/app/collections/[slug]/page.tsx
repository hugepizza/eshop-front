import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";
import { Quattrocento } from "next/font/google";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });
async function Collection({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    [key: string]: string;
  };
}) {
  const query = new URLSearchParams();
  if (params.slug && params.slug !== "all")
    query.append("collection", params.slug);
  query.append("page", "1");
  query.append("pageSize", "12");
  for (const [key, value] of Object.entries(searchParams)) {
    query.append(key, value);
  }

  const products = await fetch(
    "https://eshop-api-dev.ketianjiyi.com/product/search?" + query.toString(),
    {
      method: "GET",
    }
  );
  const data = (await products.json()) as {
    data: {
      items: {
        slug: string;
        title: string;
        price: number;
        onSalePrice?: number;
        featuredImage: string;
      }[];
    };
  };

  return (
    <section className="flex flex-col w-full justify-center items-center">
      <h2 className={`${q.className} px-48 w-full text-5xl/loose text-start`}>
        Products
      </h2>
      <div className="px-48 text-start w-full py-10">
        <div className="flex flex-row justify-between text-neutral-600 text-sm">
          <div className="flex flex-row space-x-6">
            <div>Filter:</div>
            <div className="after:float-end after:content-[url('/svg/arrow-down-icon.svg')]">
              Availability
            </div>{" "}
            <div className="after:float-end after:content-[url('/svg/arrow-down-icon.svg')]">
              Price
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div>Sort by:</div> <div>1 Product</div>
          </div>
        </div>
      </div>
      <div className="px-48 w-full grid grid-cols-4 gap-4">
        {data.data.items?.map((product) => (
          <div className="col-span-1" key={product.slug}>
            <Product
              price={product.price}
              onSalePrice={product.onSalePrice}
              slug={product.slug}
              label={product.title}
              img={product.featuredImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collection;
