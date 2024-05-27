"use client";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import Title from "./Title";

const links = [
  { href: "/settings", label: "Home" },
  { href: "/support", label: "Catalog" },
  { href: "/license", label: "Contact" },
];

function Navigation() {
  return (
    <div className="w-full flex flex-col justify-between items-center px-48 py-4">
      <Title />
      <PopoverGroup className="flex flex-row w-full justify-center">
        {links.map((link) => (
          <NavigationItem key={link.href} label={link.label} />
        ))}
      </PopoverGroup>
    </div>
  );
}

export default Navigation;

function NavigationItem({ label }: { label: string }) {
  return (
    <Popover>
      <PopoverButton
        as="button"
        className={
          "p-2 outline-none text-gray-700 data-[hover]:underline data-[hover]:text-black data-[active]:underline data-[active]:text-black"
        }
      >
        {label}
      </PopoverButton>
      <PopoverPanel>{/* ... */}</PopoverPanel>
    </Popover>
  );
}
