import {
  Button,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Title from "./Title";
import clsx from "clsx";
import Link from "next/link";
import {
  metadataApi,
  NavigationItem as NavigationItemType,
} from "@/requests/metadata";

const convertRoute = (route: string) => {
  switch (route) {
    case "/product":
      return "/collections/all";
    case "/cart":
      return "/cart";
    default:
      return "/";
  }
};
const convertNav = (nav: NavigationItemType): NavigationItemProps => ({
  label: nav.title,
  href:
    nav.type === "INTERNAL_ROUTE"
      ? convertRoute(nav.route)
      : nav.type === "EXTERNAL_LINK"
      ? nav.link
      : nav.type === "COLLECTION"
      ? `/collections/${nav.collection.slug}`
      : "/",
  sub: nav.children?.map(convertNav),
});

async function Navigation() {
  const navs = await metadataApi.getNavigation();
  const props = navs.map(convertNav);
  return (
    <div className="w-full flex flex-col justify-between items-center px-48 py-4">
      <Title />
      <PopoverGroup className="flex flex-row w-full justify-center">
        {props.map((link) => (
          <NavigationItem
            key={link.href}
            label={link.label}
            href={link.href}
            sub={link.sub}
          />
        ))}
      </PopoverGroup>
    </div>
  );
}

export default Navigation;

interface NavigationItemProps {
  label: string;
  href?: string;
  sub?: NavigationItemProps[];
}
function NavigationItem(props: NavigationItemProps) {
  return (
    <Popover>
      {!props.sub || !props.sub.length ? (
        <Button
          className={clsx(
            "p-2 outline-none text-foregroundMuted data-[hover]:underline data-[hover]:text-foreground data-[active]:underline data-[active]:text-foreground"
          )}
        >
          <Link href={props.href ?? "/"}>{props.label}</Link>
        </Button>
      ) : (
        <>
          <PopoverButton
            as="button"
            className={clsx(
              "p-2 outline-none text-foregroundMuted data-[hover]:underline data-[hover]:text-foreground data-[active]:underline data-[active]:text-foreground"
            )}
          >
            {props.label}
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor={"bottom"}
              className="divide-y divide-white/5 rounded-xl bg-foregroundMuted text-sm/6 [--anchor-gap:var(--spacing-5)]"
            >
              <div className="p-3">
                {props.sub.map((child) => (
                  <Link
                    key={child.href}
                    className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                    href={child.href ?? "#"}
                  >
                    <p className="font-semibold text-white">{child.label}</p>
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
