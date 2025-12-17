import { MetadataRoute } from "next";
import { getBlogs, getProject } from "@/data/loader";

type BlogPost = {
  slug: string;
  date: string;
  updatedAt: string;
};

type Project = {
  updatedAt: string;
  createdAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.birthgiverfilmproductions.com";

  // 1. Fetch Dynamic Data
  // We fetch these to determine the 'lastModified' date for the main listing pages
  const { data: posts } = await getBlogs();
  const { data: projects } = await getProject();

  // Calculate latest dates for main pages
  const latestPostDate = posts?.length > 0 ? new Date(posts[0].date || posts[0].updatedAt) : new Date();
  
  // Use the most recent project (now sorted by createdAt:desc) to date the /projects page
  const latestProjectDate = projects?.length > 0 
    ? new Date(projects[0].updatedAt || projects[0].createdAt) 
    : new Date();

  // 2. Define Static Routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/film-production`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/marketing-strategy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/software-development`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: latestProjectDate, // Updated based on your new sort order
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate, // Updates when you add a new blog
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // 3. Generate Dynamic Blog Routes
  const dynamicBlogRoutes = posts.map((post: BlogPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Combine and return all routes
  return [...staticRoutes, ...dynamicBlogRoutes];
}
