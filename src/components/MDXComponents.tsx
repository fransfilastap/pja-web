import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { Box, chakra, Link as ChakraLink, Table, TableProps, useColorModeValue } from '@chakra-ui/react';
import { shimmer, toBase64 } from '@/components/ChakraNextImage';
import { MDXComponents } from 'mdx/types';

function CustomLink(props: any) {
	const { href } = props;
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

	if (isInternalLink) {
		return (
			<Link href={href} {...props} passHref legacyBehavior>
				<ChakraLink display='block' position='absolute' top={0} left={0} w='max-content' h='full'>
					{props.children}
				</ChakraLink>
			</Link>
		);
	}

	return <ChakraLink cursor='pointer' target='_blank' rel='noopener noreferrer' {...props} />;
}

function MDXImage(props: ImageProps) {
	const defaultHeight = 300;
	const defaultWidth = 200;

	return (
		<Image
			{...props}
			className='mdx-image'
			placeholder='blur'
			blurDataURL={`data:image/svg+xml;base64,${toBase64(
				shimmer((props.width ?? defaultWidth) as number, (props.height ?? defaultHeight) as number)
			)}`}
			alt={props.alt}
		/>
	);
}

function CustomTable(props: TableProps) {
	return (
		<Box
			as='div'
			w='full'
			position='relative'
			overflowX='scroll'
			border={1}
			borderColor={useColorModeValue('gray.100', 'gray.800')}>
			<Table {...props}>{props.children}</Table>
		</Box>
	);
}

function TableOfContents(props: any) {
	return (
		<chakra.nav bgColor={useColorModeValue('gray.100', 'gray.800')} px={4} py={6} borderRadius={'md'}>
			<chakra.h2>Table of Contents</chakra.h2>
			{props.children}
		</chakra.nav>
	);
}

const components = {
	img: MDXImage,
	nav: TableOfContents,
	table: CustomTable,
	a: CustomLink
} as MDXComponents;

export default components;
