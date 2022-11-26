import { FunctionComponent } from 'react';
import { PostMetadata } from '@/lib/types';
import { EmptyState } from '@/components/empty/EmptyState';
import BlogPostItem from '@/components/BlogPostItem';
import MotionDiv from '@/components/Motion';
import { childAnimationProps, staggerAnimationProps } from '@/lib/constants/animation';

export type BlogPostListProps = {
	posts: PostMetadata[];
};

const BlogPostList: FunctionComponent<BlogPostListProps> = ({ posts }) => {
	if (posts.length <= 0) {
		return <EmptyState title={'Blog Post'} narrate={'No blog post right now. 🙏🏻'} />;
	}

	return (
		<MotionDiv display={'flex'} flexDir={'column'} gap={8} {...staggerAnimationProps}>
			{posts.map((post, index) => (
				<BlogPostItem
					description={post.description}
					key={index}
					title={post.title}
					slug={post.slug}
					tags={post.tags}
					date={post.date}
					cover={post.cover}
					motionProps={childAnimationProps}
					author={post.author}
				/>
			))}
		</MotionDiv>
	);
};

export default BlogPostList;
