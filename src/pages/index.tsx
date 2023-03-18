import React, { ReactElement } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { chakra, Flex, Heading, Icon, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { getPostLists } from '@/lib/content-parser';
import avatar from '~/avatar.png';
import { Container } from '@/components/ContentComponent';
import BlogPostList from '@/components/BlogPostList';
import MotionDiv from '@/components/motion/MotionDiv';
import { childAnimationProps, staggerAnimationProps } from '@/config/constants/animation';
import Config from '@/config';
import { CgArrowDown } from 'react-icons/cg';

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
			display='flex'
			flexDir='column'
			alignItems='center'
			justifyContent='center'
			w='full'
			h={'100vh'}
			mb={{ base: 10, md: 20 }}>
			<Flex
				w='full'
				direction={{ base: 'column-reverse', md: 'column-reverse' }}
				gap={{ base: 0, md: 8 }}
				justifyContent={{ base: 'center', md: 'space-between' }}
				alignItems={{ base: 'center', md: 'center' }}>
				<VStack justifyContent={{ base: 'center', md: 'start' }} alignItems={{ base: 'center', md: 'center' }}>
					<Heading size={{ base: 'lg', md: 'xl' }} fontWeight='500'>
						Frans Filasta P.
					</Heading>
					<Text fontSize={'lg'} fontWeight={'500'}>
						I{"'"}m a Full-stack developer.
					</Text>
					<MotionDiv {...staggerAnimationProps} display={'flex'} flexDir={'row'} gap={'1'}>
						<motion.a href={Config.github} {...childAnimationProps} aria-label={'github profile'}>
							<Icon as={AiFillGithub} fontSize={'2xl'} />
						</motion.a>
						<motion.a href={Config.linkedin} {...childAnimationProps} aria-label={'linkedin page'}>
							<Icon as={AiFillLinkedin} fontSize={'2xl'} />
						</motion.a>
						<motion.a href={Config.twitter} {...childAnimationProps} aria-label={'twitter page'}>
							<Icon as={AiFillTwitterCircle} fontSize={'2xl'} />
						</motion.a>
					</MotionDiv>
				</VStack>
				<chakra.div
					overflow={'hidden'}
					borderRadius={'full'}
					bgClip={'border-box'}
					width={{ base: '28', md: '40' }}
					height={{ base: '28', md: '40' }}>
					<Image src={avatar} placeholder={'blur'} alt={'avatar'} style={{ objectFit: 'contain' }} priority />
				</chakra.div>
			</Flex>
			<Icon mt={{ base: 0, md: 10 }} as={CgArrowDown} className={'scroll-down'} />
		</chakra.section>
	);
}

function ReadAllPosts(): ReactElement {
	return (
		<Link href='/blog' passHref legacyBehavior>
			<ChakraLink
				role={'group'}
				aria-label={'read all posts'}
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
	const posts = await getPostLists(1, 4);
	return {
		props: {
			posts
		}
	};
};
