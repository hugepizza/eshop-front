import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Quattrocento } from "next/font/google";
import Link from "next/link";

const inter = Quattrocento({ weight: "400", subsets: ["latin"] });
function Title() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between w-full text-center">
        <div>search</div>
        <div className={`${inter.className} p-2 text-2xl text-gray-700`}>
          eshop
        </div>
        <LangSwitch />
      </div>
    </div>
  );
}

export default Title;

function LangSwitch() {
  return (
    <Popover>
      <PopoverButton
        as="button"
        className={
          "p-2 outline-none text-gray-700 data-[hover]:underline data-[hover]:text-black data-[active]:underline data-[active]:text-black before:content-['English'] before:p-1 after:content-[url('/svg/arrow-down-icon.svg')] data-[active]:after:content-[url('/svg/arrow-up-icon.svg')]"
        }
      ></PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-1"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-1"
        leaveTo="opacity-0 translate-y-0"
      >
        <PopoverPanel
          anchor="bottom"
          className="rounded-xl text-black text-sm/6 border-solid border-[1px] border-black"
        >
          <div className="p-3">
            <a className="block rounded-lg py-2 px-3 transition" href="/">
              <p className="text-gray-700 hover:text-black">English</p>
            </a>
            <Link className="block rounded-lg py-2 px-3 transition" href="/zh">
              <p className="text-gray-700 hover:text-black">简体中文</p>
            </Link>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
