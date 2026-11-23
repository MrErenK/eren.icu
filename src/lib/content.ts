import rawConfig from "../../site.config.json";

interface SocialLink {
  label: string;
  href: string;
  handle?: string;
  note?: string;
}

interface StackGroup {
  group: string;
  items: string[];
}

interface ProjectLink {
  label: string;
  href: string;
}

export interface WorkProject {
  slug: string;
  title: string;
  year: string;
  category: string;
  status: string;
  featured?: boolean;
  url?: string;
  repo?: string;
  links?: ProjectLink[];
  summary: string;
  description: string;
  tags: string[];
}

interface SiteConfig {
  site: {
    name: string;
    handle: string;
    tld: string;
    easterEgg: string;
    email: string;
    availabilityBadge: string;
    headline: string;
    subheadline: string;
    contactPrompt: string;
    socials: SocialLink[];
  };
  about: {
    lead: string;
    paragraphs: string[];
    stack: StackGroup[];
  };
  works: WorkProject[];
}

const siteConfig: SiteConfig = rawConfig;

export const PROFILE = siteConfig.site;
export const ABOUT = siteConfig.about;
export const WORKS = siteConfig.works;

export const FEATURED_WORKS = (() => {
  const flagged = WORKS.filter((work) => work.featured);
  return flagged.length > 0 ? flagged : WORKS.slice(0, 4);
})();

export const WORK_CATEGORIES = [
  "All",
  ...Array.from(new Set(WORKS.map((work) => work.category))),
];
