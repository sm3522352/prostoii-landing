import type { MetadataRoute } from "next";

const baseUrl = "https://prostoii.ru";

const routes = [
  "/",
  "/pricing",
  "/docs/offer",
  "/docs/privacy",
  "/cancel",
  "/contact",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: updatedAt,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
