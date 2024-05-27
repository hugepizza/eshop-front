"use client";
import { ShoppingContext } from "@/components/context/Shopping";
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
  canSelect: string[][];
}
function Specs(props: SpecsProps) {
  const { value, setValue } = useContext(ShoppingContext);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  return (
    <div className="flex flex-col space-y-4">
      {props.specs.map((spec) => (
        <div key={spec.name} className="flex flex-col">
          {spec.name}
          <div className="flex flex-row space-x-2">
            {spec.options.map((option) => {
              return (
                <Button
                  key={option.value}
                  className={clsx(
                    " text-sm border-black border-solid border-[1px] min-w-24 flex items-center justify-center rounded-md py-1",
                    selectedSpecs.includes(option.value) &&
                      " text-white bg-black",
                    "data-[disabled]:bg-gray-300"
                  )}
                  disabled={
                    !props.canSelect.some(
                      (spec) =>
                        spec.includes(option.value) &&
                        selectedSpecs.every((s) => spec.some((o) => o === s))
                    )
                  }
                  onClick={(e) => {
                    e.preventDefault();

                    // remove spec
                    if (selectedSpecs.includes(option.value)) {
                      setSelectedSpecs((prev) =>
                        prev.filter((spec) => spec !== option.value)
                      );
                      return;
                    }
                    // remove spec in same parent
                    const parent = props.specs.find((spec) =>
                      spec.options.some((opt) => opt.value === option.value)
                    );
                    if (parent) {
                      const repeat = selectedSpecs.find((spec) =>
                        parent.options.some((opt) => opt.value === spec)
                      );
                      if (repeat) {
                        setSelectedSpecs((prev) =>
                          prev.filter((spec) => spec !== repeat)
                        );
                      }
                    }

                    setSelectedSpecs((prev) => [...prev, option.value]);
                    // todo: hit a sku
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
