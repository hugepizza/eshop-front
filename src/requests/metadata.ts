import { api } from "./client";

export type NavigationItem = {
  title: string;
  link: string;
  route: string;
  order: number;
  type: string;
  collection: { title: string; slug: string };
  children?: NavigationItem[];
};
type Navigations = {
  items: NavigationItem[];
};
type HomePage = {
  collections: {
    top: {
      title: string;
      description: string;
      slug: string;
      coverImage: string;
    }[];
  };
};

type LinkGroupItem = {
  title: string;
  links: { text: string; url: string }[];
};
async function getNavigation() {
  const resp = await api.get(`metadata`, { cache: "no-store" });
  const data = await resp.json();
  const navigations = (
    data as { data: { navigations: Navigations; homePage: HomePage } }
  ).data.navigations;

  const filter = (nav: NavigationItem) =>
    nav.type === "INTERNAL_ROUTE" ||
    nav.type === "FOLDER" ||
    nav.type === "COLLECTION";

  const f = navigations.items.filter(filter);
  return f.map((item) => ({
    ...item,
    children: item.children ? item.children.filter(filter) : [],
  }));
}

async function getHomePage() {
  const resp = await api.get(`metadata`, { cache: "no-store" });
  const data = await resp.json();
  const homepage = (data as { data: { homePage: HomePage } }).data.homePage;
  return homepage;
}

async function getLinkGroups() {
  const resp = await api.get(`metadata`, { cache: "no-store" });
  const data = await resp.json();
  const linkGropus = (data as { data: { linkGropus: LinkGroupItem[] } }).data
    .linkGropus;
  return linkGropus;
}

export const metadataApi = {
  getNavigation,
  getHomePage,
  getLinkGroups,
};
