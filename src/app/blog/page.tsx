import React from "react";
import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import { getBlogs, getGlobalData } from "@/data/loader";

import {
  FaUser,
  FaCalendar,
  FaTag,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";

export default async function BlogPage() {
  const { data: posts } = await getBlogs();

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

  // Separate featured post (first post) from regular posts
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  const NoImagePlaceholder = () => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <FaImage className="mx-auto w-12 h-12 mb-2" />
        <span>No Image Available</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="w-full px-4 md:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post Section */}
          {featuredPost && (
            <div className="mb-20">
              {/* Featured Post Header */}
              <div className="flex items-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                  FEATURED POST
                </h2>
                <div className="flex items-center ml-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="h-px bg-white flex-1 min-w-[100px]"></div>
                </div>
              </div>

              {/* Featured Post Card */}
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              >
                {/* Featured Post Image */}
                <div className="relative w-full h-80 md:h-96 overflow-hidden">
                  {featuredPost.image && featuredPost.image.url ? (
                    <Image
                      width={200}
                      height={200}
                      src={featuredPost.image.url}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <NoImagePlaceholder />
                  )}
                </div>

                {/* Featured Post Content */}
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    {featuredPost.title}
                  </h3>

                  {/* Featured Post Metadata */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4" />
                      <span>
                        By{" "}
                        {featuredPost.by || "bgfp@birthgiverfilmproduction.com"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="w-4 h-4" />
                      <span>
                        {new Date(featuredPost.date).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTag className="w-4 h-4" />
                      <span>{featuredPost.category || "Uncategorized"}</span>
                    </div>
                  </div>

                  {/* Featured Post Excerpt */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {featuredPost.subtitle ||
                      featuredPost.excerpt ||
                      "Discover the latest insights and behind-the-scenes content from our film production team."}
                  </p>

                  {/* Read More Button (UPDATED) */}
                  <button
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase tracking-widest text-xs transition-all duration-300 
                    bg-transparent border border-red-600 text-red-600 
                    hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
                  >
                    <span>Read More</span>
                    <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Posts Section */}
          {regularPosts.length > 0 && (
            <div>
              {/* Blog Posts Header */}
              <div className="flex items-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                  BLOG POSTS
                </h2>
                <div className="flex items-center ml-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="h-px bg-white flex-1 min-w-[100px]"></div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post: any) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Post Image */}
                    <div className="relative w-full h-64 overflow-hidden shrink-0">
                      {post.image && post.image.url ? (
                        <Image
                          width={200}
                          height={200}
                          src={post.image.url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <NoImagePlaceholder />
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        {post.title}
                      </h3>

                      {/* Post Excerpt */}
                      <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                        {post.subtitle ||
                          post.excerpt ||
                          "Read more about this topic and discover insights from our production team."}
                      </p>

                      {/* Read More Button (UPDATED) */}
                      <div className="mt-auto mb-6">
                        <button
                          className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold uppercase tracking-widest text-xs transition-all duration-300 
                          bg-transparent border border-red-600 text-red-600 
                          hover:bg-red-600 hover:text-white hover:shadow-lg hover:-translate-y-1"
                        >
                          <span>Read More</span>
                          <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>

                      {/* Post Metadata */}
                      <div className="space-y-2 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                          <FaUser className="w-4 h-4" />
                          <span>
                            By {post.by || "bgfp@birthgiverfilmproduction.com"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendar className="w-4 h-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaTag className="w-4 h-4" />
                          <span>{post.category || "Uncategorized"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <CTASection data={cta} />
    </div>
  );
}
