"use client";
import { SpecSelectContext } from "@/components/context/Shopping";
import { Button, Input } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useState } from "react";

interface SpecsProps {
  specs: {
    name: string;
    options: {
      name: string;
      value: string;
    }[];
  }[];
  defaultSelectedSpecs: string[];
}
function Specs(props: SpecsProps) {
  const { value, setValue } = useContext(SpecSelectContext);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(props.defaultSelectedSpecs);
  const canSelect = value.skus.map((sku) => sku.attributes);
  return (
    <div className="flex flex-col space-y-4">
      {props.specs.map((spec) => (
        <div key={spec.name} className="flex flex-col">
          {spec.name}
          <div className="flex flex-row space-x-2">
            {spec.options.map((option) => {
              const parent = props.specs.find((spec) =>
                spec.options.some((opt) => opt.value === option.value)
              );
              const sibling =
                parent &&
                selectedSpecs.find((spec) =>
                  parent.options.some((opt) => opt.value === spec)
                );

              return (
                <Button
                  key={option.value}
                  className={clsx(
                    " text-sm border-black border-solid border-[1px] min-w-24 flex items-center justify-center rounded-md py-1",
                    selectedSpecs.includes(option.value) &&
                      " text-white bg-black",
                    "data-[disabled]:bg-background/5 data-[disabled]:line-through"
                  )}
                  disabled={
                    !canSelect.some(
                      (spec) =>
                        spec.includes(option.value) &&
                        selectedSpecs
                          .filter((s) => s != sibling)
                          .every((s) => spec.includes(s))
                    )
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    let prev = selectedSpecs;
                    // remove spec
                    if (selectedSpecs.includes(option.value)) {
                      setSelectedSpecs((prev) =>
                        prev.filter((spec) => spec !== option.value)
                      );
                      return;
                    }

                    // remove sibling spec
                    if (sibling) {
                      prev = prev.filter((spec) => spec !== sibling);
                    }

                    const after = [...prev, option.value];
                    setSelectedSpecs(after);
                    // todo: hit a sku
                    console.log("after", after);
                    console.log(
                      "value.skus",
                      value.skus.map((sku) => sku.attributes)
                    );

                    const hit = value.skus.find((sku) =>
                      sku.attributes.every((s) => after.includes(s))
                    );
                    if (hit) {
                      setValue({
                        ...value,
                        onSalePrice: hit.onSalePrice,
                        price: hit.price,
                        hitSkuId: hit.id,
                      });
                    } else {
                      setValue({
                        ...value,
                        hitSkuId: undefined,
                      });
                    }
                  }}
                  value={option.value}
                >
                  {option.name}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Specs;
