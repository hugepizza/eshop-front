/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Collection from "@/components/Collection";
import Product from "@/components/Product";
import { Quattrocento } from "next/font/google";
const q = Quattrocento({ weight: "400", subsets: ["latin"] });

async function Home() {
  const params = new URLSearchParams();

  params.append("page", "1");
  params.append("pageSize", "12");

  const products = await fetch(
    "https://eshop-api-dev.ketianjiyi.com/product/search?" + params.toString(),
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
      <h2 className={`${q.className} w-full text-5xl/loose text-center`}>
        Browse our latest products
      </h2>
      <div className="px-48 w-full grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Collection
            slug=""
            label="Dunk"
            img="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f6a28a8-6213-4bb9-b362-d5846aa39fae/dunk-low-retro-shoe-66RGqF.png"
          />
        </div>
        <div className="col-span-2">
          <Collection
            slug=""
            label="Dunk"
            img="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f6a28a8-6213-4bb9-b362-d5846aa39fae/dunk-low-retro-shoe-66RGqF.png"
          />
        </div>
      </div>
      <div className="h-6" />
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

export default Home;
