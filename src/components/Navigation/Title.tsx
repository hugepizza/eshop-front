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
    <div className="flex flex-col w-full text-foregroundMuted">
      <div className="flex flex-row justify-between w-full text-center">
        <div>search</div>
        <div className={`${inter.className} p-2 text-2xl`}>eshop</div>
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
          "p-2 outline-none data-[hover]:underline data-[hover]:text-foreground data-[active]:underline data-[active]:text-black before:content-['English'] before:p-1 after:content-[url('/svg/arrow-down-icon.svg')] data-[active]:after:content-[url('/svg/arrow-up-icon.svg')]"
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
          className="rounded-xl text-foreground text-sm/6 border-solid border-[1px] border-black"
        >
          <div className="p-3">
            <a className="block rounded-lg py-2 px-3 transition" href="/">
              <p className="text-foregroundMuted hover:text-foreground">
                English
              </p>
            </a>
            <Link className="block rounded-lg py-2 px-3 transition" href="/zh">
              <p className="text-foregroundMuted hover:text-foreground">
                简体中文
              </p>
            </Link>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
