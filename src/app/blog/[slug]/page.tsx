import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, getGlobalData } from "@/data/loader";
import Markdown from "react-markdown";
import {
  FaUser,
  FaCalendar,
  FaTag,
  FaArrowLeft,
  FaShare,
  FaImage,
} from "react-icons/fa";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import CTASectionTwo from "@/components/CTASectionTwo";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const globalresponse = await getGlobalData();
  const cta = globalresponse?.data?.cta[0];

  const { data } = await getBlogBySlug(slug);
  const post = data?.[0];
  if (!post) return notFound();

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
      {/* Back Button */}
      <div className="w-full px-4 md:px-20 pt-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 mb-8 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      <div className="w-full px-4 md:px-20 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Blog Post Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Featured Image */}
            <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
              {post.image && post.image.url ? (
                <>
                  <Image
                    width={200}
                    height={200}
                    src={post.image.url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                </>
              ) : (
                <NoImagePlaceholder />
              )}
            </div>

            {/* Post Content */}
            <div className="p-8 md:p-12">
              {/* Post Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Post Subtitle */}
              {post.subtitle && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.subtitle}
                </p>
              )}

              {/* Post Metadata */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-500">
                  <FaUser className="w-4 h-4" />
                  <span>
                    By {post.by || "bgfp@birthgiverfilmproduction.com"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaCalendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaTag className="w-4 h-4" />
                  <span>{post.category || "Uncategorized"}</span>
                </div>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 ml-auto">
                  <FaShare className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Post Content */}
              <div className="prose prose-lg prose-gray max-w-none">
                <Markdown>{post?.content || ""}</Markdown>
              </div>

              {/* Post Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors duration-200 font-medium group"
                  >
                    <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span>Back to All Posts</span>
                  </Link>

                  <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium">
                    <FaShare className="w-4 h-4" />
                    <span>Share Article</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTASectionTwo />
      </div>

      {/* CTA Section */}
    </div>
  );
}
