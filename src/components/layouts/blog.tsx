import { PropsWithChildren } from 'react';
import { AspectRatio, chakra, Flex, Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import config from '@/config';
import { format, parseISO } from 'date-fns';
import { Layout } from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import { ParsedContent, PostMetadata } from '@/types';
import ViewCounter from '@/components/ViewCounter';
import PostAttribute from '@/components/PostAttribute';
import avatar from '~/avatar.png';
import { Container, MarkdownContent } from '@/components/ContentComponent';
import Image from 'next/image';
import LazyLoadImage from '@/components/Image';

export default function BlogLayout({ post }: PropsWithChildren<{ post: ParsedContent<PostMetadata> }>) {
	const blogTitle = `${config.site_url}/blog/${post.matter.title}`;
	const color = useColorModeValue('gray.700', 'gray.500');

	return (
		<Layout>
			<BasicMeta
				title={post.matter.title}
				description={post.matter.description}
				author={config.site_url}
				url={`${config.site_url}/blog/${post.matter.slug}`}
				keywords={post.matter.keywords}
			/>
			<OpenGraphMeta description={post.matter.description} title={post.matter.title} url={blogTitle} />
			<Container maxW={'container.md'}>
				<chakra.article my={{ base: '4', md: '8' }}>
					{post.matter.cover && (
						<chakra.figure mb={10}>
							<AspectRatio ratio={16 / 9} w={'full'} h={'40vh'} borderRadius='xl' boxShadow={'xl'} overflow={'hidden'}>
								<LazyLoadImage src={post.matter.cover} alt={post.matter.title} fill sizes={'100vw'} />
							</AspectRatio>
						</chakra.figure>
					)}
					<Heading as={'h1'} size={{ base: 'xl', md: '2xl' }} mb={4} fontWeight='bold'>
						{post.matter.title}
					</Heading>
					<Flex flexDir={{ base: 'column', md: 'row' }} justifyContent='space-between' mb={{ base: 6, md: 4 }}>
						<VStack justifyContent={'flex-start'} alignItems={'start'} gap={0}>
							<HStack>
								<AspectRatio ratio={1 / 1} borderRadius='3xl' width={25} height={25} overflow={'hidden'}>
									<Image alt={'Author Photo'} src={avatar} />
								</AspectRatio>
								<Text fontSize={{ base: 'sm', md: 'sm' }} color={color}>
									<span>{config.author}</span>
									<span> / {format(parseISO(post.matter.date), 'MMMM dd, yyyy')}</span>
								</Text>
							</HStack>
						</VStack>
						<HStack>
							<ViewCounter color={color} slug={post.matter.slug} />
							<PostAttribute color={color}>{`/ ${post.matter.readingTime.text}`}</PostAttribute>
						</HStack>
					</Flex>
					<MarkdownContent content={post} />
					{post.matter.lastmod ? (
						<Text mt={8} fontSize={{ base: 'sm', md: 'sm' }} color={'gray.500'}>{`Last edited at ${format(
							parseISO(post.matter.lastmod),
							'MMMM dd, yyyy'
						)}`}</Text>
					) : (
						''
					)}
				</chakra.article>
			</Container>
		</Layout>
	);
}
