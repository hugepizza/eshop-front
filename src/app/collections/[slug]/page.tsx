import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";
import { Quattrocento } from "next/font/google";
import { collectionApi } from "@/requests/collection";
import { productApi } from "@/requests/prooduct";
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
  let collectionSlug: string | undefined = undefined;

  if (params.slug !== "all") {
    collectionSlug = params.slug;
  }

  if (collectionSlug) {
    query.append("collection", collectionSlug);
  }
  query.append("page", "1");
  query.append("pageSize", "12");

  for (const [key, value] of Object.entries(searchParams)) {
    query.append(key, value);
  }

  const collection = collectionSlug
    ? await collectionApi.get(params.slug)
    : undefined;


  const products = await productApi.list(query);

  return (
    <section className="flex flex-col w-full justify-center items-center text-foreground">
      {collection ? (
        <>
          <h2
            className={`${q.className} px-48 w-full text-5xl/loose text-start`}
          >
            {collection?.title}
          </h2>
          <text
            className={`${q.className} px-48 w-full text-base/loose text-start text-foregroundMuted`}
          >
            {collection?.description}
          </text>
        </>
      ) : (
        <h2 className={`${q.className} px-48 w-full text-5xl/loose text-start`}>
          Products
        </h2>
      )}

      <div className="px-48 text-start w-full py-10">
        <div className="flex flex-row justify-between text-foregroundMuted text-sm">
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
        {products.items?.map((product) => (
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
