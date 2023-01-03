import React, { FunctionComponent } from 'react';
import { AspectRatio, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import { PostMetadata, PostViewResponse } from '@/types';
import fetcher from '@/lib/fetcher';
import MotionDiv from '@/components/motion/MotionDiv';
import PostAttribute from '@/components/PostAttribute';
import SmoothTransitionImage from '@/components/Image';

export type BlogPostItemProps = PostMetadata &
	Omit<MotionProps, 'transition'> & {
		forcePriority?: boolean;
	};

const BlogPostCard: FunctionComponent<BlogPostItemProps> = ({
	title,
	slug,
	description,
	cover,
	forcePriority = false,
	...rest
}) => {
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
				{...rest}>
				<AspectRatio w={'full'} ratio={16 / 9} borderRadius={'lg'} overflow={'hidden'}>
					<SmoothTransitionImage
						src={cover.original.source}
						alt={`Thumbnail of ${title}`}
						fill
						sizes={'100vw'}
						placeholder={'blur'}
						blurDataURL={cover.original.placeholder}
						priority={forcePriority}
					/>
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

export default React.memo(BlogPostCard);
