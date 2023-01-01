import React, { ReactElement } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { chakra, Flex, Heading, Link as ChakraLink, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { getPostLists } from '@/lib/content-parser';
import avatar from '~/avatar.png';
import { Container } from '@/components/ContentComponent';
import BlogPostList from '@/components/BlogPostList';

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout>
			<Container maxW='container.md'>
				<Masthead />
				<Section mt={{ base: 6, md: 6 }} title='Recent Posts'>
					<VStack justifyContent='flex-start' alignItems='start' gap={4}>
						<BlogPostList posts={posts} />
						<ReadAllPosts />
					</VStack>
				</Section>
			</Container>
		</Layout>
	);
}

function Masthead(): ReactElement {
	return (
		<chakra.section
			borderRadius='3xl'
			display='flex'
			flexDir='column'
			alignItems='center'
			justifyContent='center'
			w='full'
			h={{ base: '40vh', md: '40vh' }}
			mb={{ base: 10, md: 20 }}>
			<Flex
				w='full'
				direction={{ base: 'column-reverse', md: 'row' }}
				gap={{ base: 0, md: 8 }}
				justifyContent='space-between'
				alignItems='start'>
				<chakra.div>
					<Heading mb='0.5' size={{ base: 'lg', md: 'xl' }} fontWeight='500'>
						Frans Filasta P.
					</Heading>
					<Text fontSize={{ base: 'md', md: 'xl' }}>Full-stack developer.</Text>
					<Text color={useColorModeValue('gray.600', 'gray.400')} fontSize={'0.9em'} mt={{ base: 4, md: 6 }}>
						I am passionate to help digital transformation process in Indonesia Government Organization.
					</Text>
				</chakra.div>
				<div>
					<chakra.div
						overflow={'hidden'}
						borderRadius={'full'}
						bgClip={'border-box'}
						width={{ base: '28', md: '40' }}
						height={{ base: '28', md: '40' }}>
						<Image src={avatar} placeholder={'blur'} alt={'avatar'} style={{ objectFit: 'contain' }} />
					</chakra.div>
				</div>
			</Flex>
		</chakra.section>
	);
}

function ReadAllPosts(): ReactElement {
	return (
		<Link href='/blog' passHref legacyBehavior>
			<ChakraLink
				role={'group'}
				display='flex'
				fontWeight='semibold'
				_hover={{ textDecor: 'none' }}
				flexDir='row'
				justifyContent='space-between'
				alignItems='center'>
				<span>Read all posts </span>
				<chakra.svg
					transition={'all'}
					transitionTimingFunction={'ease-in-out'}
					transitionDuration={'150'}
					_groupHover={{ translateX: '30px' }}
					w={8}
					h={8}
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
				</chakra.svg>
			</ChakraLink>
		</Link>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = await getPostLists(1, 3);
	return {
		props: {
			posts
		}
	};
};
