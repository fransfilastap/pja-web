import React, { useMemo, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { Button, HStack, VStack } from '@chakra-ui/react';
import { Bookmark } from '@/types';
import { Layout } from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import config from '@/config';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import Masthead from '@/components/Masthead';
import { Container } from '@/components/ContentComponent';
import BookmarkCard from '@/components/BookmarkCard';
import MotionGrid from '@/components/motion/MotionGrid';
import { childAnimationProps, staggerAnimationProps } from '@/config/constants/animation';
import fetchBookmarks from '@/lib/bookmark';

interface BookmarkPageProps {
	bookmarks: Bookmark[];
	tags: string[];
}

const BookmarkPage: NextPage<BookmarkPageProps> = ({ bookmarks, tags }) => {
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const filteredBookmarks = useMemo(() => {
		if (!selectedTag) return bookmarks;
		return bookmarks.filter((bookmark) => bookmark.tags.includes(selectedTag!));
	}, [selectedTag, bookmarks]);

	return (
		<Layout>
			<BasicMeta
				title={'Bookmarks'}
				description={'Collection of resources I interested in.'}
				url={`${config.site_url}/bookmarks`}
			/>
			<OpenGraphMeta title={'Bookmarks'} />
			<Container display={'flex'} flexDir={'column'} gap={'4'} mt={5} maxW={'container.md'}>
				<Masthead title={'Bookmarks'} subTitle={'Collection of websites that interest me.'} />
				<VStack gap={5}>
					<HStack as={'section'} flexWrap={'wrap'} gridRowGap={2} w={'full'} spacing={3}>
						<Button
							textTransform='uppercase'
							colorScheme='purple'
							size='xs'
							onClick={() => {
								setSelectedTag(null);
							}}
							variant={!selectedTag ? 'solid' : 'ghost'}>
							All
						</Button>
						{tags.map((tag, index) => (
							<Button
								textTransform='uppercase'
								colorScheme='purple'
								size='xs'
								key={index}
								onClick={() => {
									setSelectedTag(tag);
								}}
								variant={tag === selectedTag ? 'solid' : 'ghost'}>
								{tag}
							</Button>
						))}
					</HStack>
					<MotionGrid
						as={'section'}
						alignItems={'stretch'}
						gap={10}
						w={'full'}
						gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}
						{...staggerAnimationProps}>
						{filteredBookmarks.map((bookmark, index) => (
							<BookmarkCard key={index} bookmark={bookmark} {...childAnimationProps} />
						))}
					</MotionGrid>
				</VStack>
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const bookmarks = await fetchBookmarks();
	const tagHash: Record<string, string> = {};

	bookmarks.forEach((b) => {
		b.tags.forEach((tag) => {
			tagHash[tag] = tag;
		});
	});

	return {
		props: {
			bookmarks,
			tags: Object.entries(tagHash).map(([, v]) => v)
		}
	};
};

export default BookmarkPage;
