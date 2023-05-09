import Container from "@/components/container";
import { Metadata } from "next";
import FeaturedPost from "@/components/featured-post";
import BlogPost from "@/components/blog-post";
import { allBlogs } from "contentlayer/generated";
import featureCover from "../../../public/media/featured-post.jpg";
import { compareDesc, format } from "date-fns";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function Page() {
  const blogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date as string), new Date(b.date as string))
  );

  return (
    <Container className="p-6 my-20">
      <div className="flex flex-col items-start justify-between mb-10">
        <h2 className="font-[600] py-5 text-7xl font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          Blog
        </h2>
        <p className="text-lg font-light">
          My Thought, experiments, and tutorial
        </p>
      </div>
      <Suspense fallback={<Skeleton />}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {blogs.map((blog, i) => (
            <BlogPost key={i} blog={blog} />
          ))}
        </div>
      </Suspense>
    </Container>
  );
}

function Skeleton() {
  return (
      <div className={"flex flex-col justify-center items-center w-full h-[100vh] border border-gray-50"}>
          <p className="font-[500]">
              Loading....
          </p>
      </div>
  );
}
