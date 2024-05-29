"use client";

import { reload } from "@/actions/cart";
import { SpecSelectContext } from "@/components/context/SpecSelect";
import { CartApi } from "@/requests/cart";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useContext, useState, useTransition } from "react";

// const revalidate = async () => {
//   "use server";
//   revalidatePath("profile");
// };

function CartButton() {
  const { value } = useContext(SpecSelectContext);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  return (
    <>
      <Button
        className={clsx(
          "rounded-md w-full py-[8px] text-sm border-black box-border border-[1px]",
          "data-[hover]:py-[7px] data-[hover]:border-[2px] data-[hover]:scale-y-110 data-[hover]:scale-x-105",
          "transition-transform duration-150 "
        )}
        disabled={!value.hitSkuId || isPending}
        onClick={() => {
          startTransition(async () => {
            value.hitSkuId &&
              (await CartApi.update(value.hitSkuId, value.count));
            reload();
            setIsOpen(true);
          });
        }}
      >
        {isPending ? "Adding..." : "Add to cart"}
      </Button>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl p-6 bg-background text-foreground">
                  <DialogTitle as="h3" className="text-base/7 font-medium">
                    <div className="flex flex-row items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="currentColor"
                          d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8m-.615 12.66h-1.34l-3.24-4.54l1.341-1.25l2.569 2.4l5.141-5.931l1.34.94z"
                        />
                      </svg>
                      <div>Item added to your cart</div>
                    </div>
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 ">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Button
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-foregroundMuted py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-foreground data-[open]:bg-gray-700 w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Button>
                    <Button
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-background py-1.5 px-3 text-sm/6 font-semibold text-foreground shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 w-full"
                      onClick={() => {
                        setIsOpen(false);
                        push("/cart");
                      }}
                    >
                      View Cart
                    </Button>
                    <div
                      className="w-full flex flex-row justify-center items-center underline text-foregroundMuted"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="cursor-pointer">Continue shopping</div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default CartButton;
