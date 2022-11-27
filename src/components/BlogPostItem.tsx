import React, { FunctionComponent } from 'react';
import { Heading, Text, useColorModeValue } from '@chakra-ui/react';
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
			<MotionDiv
				role={'group'}
				p={{ base: '0.5rem', md: '1rem' }}
				borderRadius={'lg'}
				display={'flex'}
				gap={1}
				flexDir={'column'}
				justifyContent={'space-between'}
				{...motionProps}>
				<Heading
					fontWeight={'semibold'}
					color={useColorModeValue('gray.700', 'gray.100')}
					fontSize={{ md: 'xl', base: 'larger' }}>
					{title}
				</Heading>
				<PostAttribute color={'gray.500'} fontSize={'sm'}>
					{data?.total} views
				</PostAttribute>
				<Text color={useColorModeValue('gray.600', 'gray.500')}>{description}</Text>{' '}
			</MotionDiv>
		</Link>
	);
};

export default BlogPostItem;
