/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Collection from "@/components/Collection";
import Product from "@/components/Product";
import { metadataApi } from "@/requests/metadata";
import { productApi } from "@/requests/prooduct";
import { Quattrocento } from "next/font/google";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });

async function Home() {
  const query = new URLSearchParams();
  query.append("page", "1");
  query.append("pageSize", "12");
  const products = await productApi.list(query);
  const homepage = await metadataApi.getHomePage();
  return (
    <section className="flex flex-col w-full justify-center items-center">
      <h2 className={`${q.className} w-full text-5xl/loose text-center`}>
        Browse our latest products
      </h2>
      <div className="px-48 w-full grid grid-cols-3 gap-6">
        {homepage.collections.top.length >= 1 && (
          <div className="col-span-1">
            <Collection
              slug={homepage.collections.top[0].slug}
              label={homepage.collections.top[0].title}
              img={homepage.collections.top[0].coverImage}
            />
          </div>
        )}
        {homepage.collections.top.length >= 2 && (
          <div className="col-span-2">
            <Collection
              slug={homepage.collections.top[1].slug}
              label={homepage.collections.top[1].title}
              img={homepage.collections.top[1].coverImage}
            />
          </div>
        )}
      </div>
      <div className="h-6" />
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

export default Home;
