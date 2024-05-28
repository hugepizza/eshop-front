import { metadataApi } from "@/requests/metadata";
import Link from "next/link";

async function Foot() {
  const linkGroups = await metadataApi.getLinkGroups();
  return (
    <footer className="w-full bg-foreground mt-12 text-sm grid grid-cols-5 text-stone-300 py-4">
      <div className="col-span-2"></div>
      <div className="col-span-3 flex flex-row">
        {linkGroups.map((link) => (
          <ul
            key={link.title}
            className="flex flex-col justify-start items-start w-full h-full gap-4 text-base"
          >
            <li className="">{link.title}</li>
            <div className="h-1" />
            {link.links.map((link) => (
              <li key={link.text} className="font-light text-sm">
                <Link href={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </footer>
  );
}
export default Foot;
