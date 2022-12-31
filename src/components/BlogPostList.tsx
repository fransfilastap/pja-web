import { FunctionComponent } from 'react';
import { PostMetadata } from '@/types';
import { EmptyState } from '@/components/empty/EmptyState';
import BlogPostCard from '@/components/BlogPostCard';
import MotionDiv from '@/components/Motion';
import { childAnimationProps, staggerAnimationProps } from '@/config/constants/animation';
import { SimpleGrid, Text } from '@chakra-ui/react';

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
		<MotionDiv
			as={SimpleGrid}
			alignItems={'stretch'}
			gap={6}
			w={'full'}
			columns={{ base: 1, sm: 2, md: 2 }}
			{...staggerAnimationProps}>
			{posts.map((post, index) => (
				<BlogPostCard
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
