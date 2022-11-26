import React, { FunctionComponent } from 'react';
import { Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ContentMetadata, PostViewResponse } from '@/lib/types';
import { MotionProps } from 'framer-motion';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import MotionDiv from '@/components/Motion';
import PostAttribute from '@/components/PostAttribute';

export type BlogPostItemProps = ContentMetadata & {
	motionProps?: Omit<MotionProps, 'transition'>;
};

const BlogPostItem: FunctionComponent<BlogPostItemProps> = (props) => {
	const { title, slug, description, motionProps } = props;
	const { data } = useSWR<PostViewResponse>(`/api/views/${slug}`, fetcher);

	return (
		<Link href={`/blog/${slug}`} style={{ width: '100%' }}>
			<MotionDiv display={'flex'} flexDir={'row'} justifyContent={'space-between'} {...motionProps}>
				<Flex flexDir={'column'} justifyContent={'space-between'}>
					<Heading
						fontWeight={'semibold'}
						color={useColorModeValue('gray.700', 'gray.100')}
						size={{ md: 'md', base: 'lg' }}>
						{title}
					</Heading>
					<PostAttribute display={{ base: 'block', md: 'none' }}>{data?.total} views</PostAttribute>
					<Text color={useColorModeValue('gray.600', 'gray.500')}>{description}</Text>
				</Flex>
				<PostAttribute display={{ base: 'none', md: 'block' }}>{data?.total} views</PostAttribute>
			</MotionDiv>
		</Link>
	);
};

export default BlogPostItem;
