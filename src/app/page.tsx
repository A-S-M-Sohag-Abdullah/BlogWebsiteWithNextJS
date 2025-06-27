import { Suspense } from "react";
import BlogSection from "@/components/homepageblogcards/BlogSection";
import Skeleton from "@/components/ui/skeleton";
import { montserrat } from "@/components/googleFonts/fontsProvider";
import RecentBlogs from "@/components/homepageblogcards/RecentBlogs";
import HomeCategoryBlogSection from "@/components/homepageblogcards/HomeCategoryBlogSection";
import HalfWidhtCategoryBlogSection from "@/components/homepageblogcards/HalfWidhtCategoryBlogSection";
/* import Link from "next/link"; */
import SideBySIdeCategorySection from "@/components/homepageblogcards/SideBySIdeCategorySection";

export default function Home() {
  return (
    <main
      className={`px-4 py-8 max-w-screen-xl mx-auto ${montserrat.className}`}
    >
      <h1 className="text-2xl font-medium mb-6">Featured Blogs</h1>

      {/* Featured Blogs */}
      <Suspense
        fallback={
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className={`rounded col-span-2 
              }overflow-hidden bg-white shadow-2xl`}
            >
              <Skeleton className="w-full h-96" />
              <div className="p-4">
                <Skeleton className="h-6 w-25 mb-2" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
            <div className="col-span-1 flex flex-col space-y-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex bg-white shadow-md space-x-2 rounded items-center"
                  >
                    <Skeleton className="w-48 h-40" />
                    <div className="p-4 flex-shrink-0">
                      <Skeleton className="h-6 w-15 mb-2" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        }
      >
        <BlogSection />
      </Suspense>

      <div className="border-b mb-6"></div>

      {/*  */}
      <Suspense
        fallback={
          <section className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <Skeleton className="w-2/4 h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                </div>
              ))}
          </section>
        }
      >
        <RecentBlogs />
      </Suspense>

      <h2 className="text-2xl font-bold mb-4">Stock Market News</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
          </div>
        }
      >
        <HomeCategoryBlogSection category="Entertainment" />
      </Suspense>

      <h2 className="text-2xl font-bold mb-4">Latest Technology</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white relative">
                  <Skeleton className="w-full h-96" />
                  <div className="p-4 space-y-2 absolute bottom-3 left-5 z-10">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
          </div>
        }
      >
        <HalfWidhtCategoryBlogSection category="Automobile" />
      </Suspense>

      <h2 className="text-2xl font-bold mb-4">Politics</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
          </div>
        }
      >
        <HomeCategoryBlogSection category="Business" />
      </Suspense>

      <h2 className="text-2xl font-bold mb-4">Health</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
          </div>
        }
      >
        <HomeCategoryBlogSection category="Career" />
      </Suspense>

      <h2 className="text-2xl font-bold mb-4">Automobile</h2>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="">
                  <Skeleton className="w-full h-48" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </div>
              ))}
          </div>
        }
      >
        <HomeCategoryBlogSection category="Crime" />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <Skeleton className="w-full h-48" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-full h-48" />
              </div>
            </div>
          }
        >
          <SideBySIdeCategorySection category="Automobile" />
        </Suspense>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <Skeleton className="w-full h-48" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-full h-48" />
              </div>
            </div>
          }
        >
          <SideBySIdeCategorySection category="Health" />
        </Suspense>
      </div>
    </main>
  );
}
