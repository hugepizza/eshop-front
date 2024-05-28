/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Collection from "@/components/Collection";
import Product from "@/components/Product";
import { productApi } from "@/requests/prooduct";
import { Quattrocento } from "next/font/google";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });

async function Home() {
  const query = new URLSearchParams();
  query.append("page", "1");
  query.append("pageSize", "12");
  const products = await productApi.list(query);

  return (
    <section className="flex flex-col w-full justify-center items-center">
      <h2 className={`${q.className} w-full text-5xl/loose text-center`}>
        Browse our latest products
      </h2>
      <div className="px-48 w-full grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Collection
            slug="best-seller"
            label="Best Saler"
            img="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f6a28a8-6213-4bb9-b362-d5846aa39fae/dunk-low-retro-shoe-66RGqF.png"
          />
        </div>
        <div className="col-span-2">
          <Collection
            slug="new-arrival"
            label="New Arrival"
            img="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f6a28a8-6213-4bb9-b362-d5846aa39fae/dunk-low-retro-shoe-66RGqF.png"
          />
        </div>
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
