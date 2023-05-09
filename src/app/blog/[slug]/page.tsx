import Container from "@/components/container";
import { allBlogs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import MDXComponent from "@/components/mdx/MDXComponent";
import clsxm from "@/helpers/clsxm";
import TableOfContent from "@/components/mdx/TableOfContent";
import { format } from "date-fns";
import ContentDate from "@/components/content-date";
import Title from "@/components/content-title";
import ContentIntro from "@/components/content-intro";
import ContentReadingTime from "@/components/content-reading-time";

export const generateStaticParams = async () =>
  allBlogs.map((post: any) => ({ slug: post._raw.flattenedPath }));
export const generateMetadata = ({ params }: any) => {
  const post = allBlogs.find(
    (post: any) => post._raw.flattenedPath === params.slug
  );
  return { title: post?.title, description: post?.description };
};

export default function BlogPostLayout({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const post = allBlogs.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) notFound();

  return (
    <Container className="p-10 mt-20">
      <div className="inline-flex gap-4 mb-2">
        <ContentDate date={post.date} />
        <ContentReadingTime>{post.timeToRead}</ContentReadingTime>
      </div>
      <Title>{post.title}</Title>
      <ContentIntro className="my-10">{post.description}</ContentIntro>
      <div className="flex flex-col-reverse justify-between w-full gap-3 lg:flex-row">
        <MDXComponent code={post.body.code} />
        <TableOfContent headings={post.headings} />
      </div>
    </Container>
  );
}
