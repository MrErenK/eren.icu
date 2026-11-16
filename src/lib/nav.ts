export const NAV_ITEMS = [
  { href: "/about", label: "About", order: 1 },
  { href: "/works", label: "Works", order: 2 },
  { href: "/contact", label: "Contact", order: 3 },
] as const;

export function getRouteOrder(pathname: string): number {
  if (pathname.startsWith("/about")) return 1;
  if (pathname.startsWith("/works")) return 2;
  if (pathname.startsWith("/contact")) return 3;
  return 0;
}

export function getTransitionTypes(
  targetOrder: number,
  currentOrder: number
): string[] | undefined {
  if (targetOrder > currentOrder) return ["nav-forward"];
  if (targetOrder < currentOrder) return ["nav-back"];
  return undefined;
}
