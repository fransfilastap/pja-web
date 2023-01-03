import { FunctionComponent } from 'react';
import { PostMetadata } from '@/types';
import { EmptyState } from '@/components/empty/EmptyState';
import BlogPostCard from '@/components/BlogPostCard';
import { childAnimationProps, staggerAnimationProps } from '@/config/constants/animation';
import { Text } from '@chakra-ui/react';
import MotionGrid from '@/components/motion/MotionGrid';

export type BlogPostListProps = {
	posts: PostMetadata[];
};

const BlogPostList: FunctionComponent<BlogPostListProps> = ({ posts }) => {
	if (posts.length <= 0) {
		return (
			<EmptyState>
				<Text>No article for that query.</Text>
			</EmptyState>
		);
	}

	return (
		<MotionGrid
			alignItems={'stretch'}
			gap={6}
			w={'full'}
			gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}
			{...staggerAnimationProps}>
			{posts.map((post, index) => (
				<BlogPostCard
					fullPath={''}
					description={post.description}
					key={index}
					title={post.title}
					slug={post.slug}
					tags={post.tags}
					date={post.date}
					cover={post.cover}
					author={post.author}
					readingTime={post.readingTime}
					{...childAnimationProps}
				/>
			))}
		</MotionGrid>
	);
};

export default BlogPostList;
