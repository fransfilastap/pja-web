import React, { FunctionComponent } from 'react';
import { AspectRatio, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { ContentMetadata, PostViewResponse } from '@/types';
import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import MotionDiv from '@/components/Motion';
import PostAttribute from '@/components/PostAttribute';
import LazyLoadImage from '@/components/Image';

export type BlogPostItemProps = ContentMetadata & {
	motionProps?: Omit<MotionProps, 'transition'>;
};

const BlogPostCard: FunctionComponent<BlogPostItemProps> = (props) => {
	const { title, slug, description, motionProps, cover } = props;
	const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher, { suspense: false });

	return (
		<Link href={`/blog/${slug}`} style={{ width: '100%' }}>
			<MotionDiv
				role={'group'}
				whileHover={{
					scale: 1.02
				}}
				display={'flex'}
				gap={1}
				flexDir={'column'}
				justifyContent={'space-between'}
				overflow={'hidden'}
				{...motionProps}>
				<AspectRatio w={'full'} ratio={16 / 9} borderRadius={'lg'} overflow={'hidden'}>
					<LazyLoadImage src={cover} alt={`Thumbnail of ${title}`} fill sizes={'100vw'} />
				</AspectRatio>
				<VStack justifyContent={'start'} alignItems={'start'} mt={3}>
					<Heading fontWeight={'500'} color={useColorModeValue('gray.700', 'gray.100')} fontSize={'1.3em'}>
						{title}
					</Heading>
					<PostAttribute>{data?.total} views</PostAttribute>
					<Text color={useColorModeValue('gray.600', 'gray.500')}>{description}</Text>{' '}
				</VStack>
			</MotionDiv>
		</Link>
	);
};

export default BlogPostCard;
