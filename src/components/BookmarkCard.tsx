import React, { FunctionComponent } from 'react';
import { Bookmark } from '@/types';
import Link from 'next/link';
import MotionDiv from '@/components/Motion';
import { LazyLoadImage } from '@/components/Image/LazyLoadImage';
import { AspectRatio, Heading, Text, VStack } from '@chakra-ui/react';
export interface BookmarkCardProps {
	bookmark: Bookmark;
}
const BookmarkCard: FunctionComponent<BookmarkCardProps> = ({ bookmark }) => {
	const { link, tags, description, title, cover } = bookmark;
	return (
		<Link href={link}>
			<MotionDiv as={'article'} overflow={'hidden'}>
				<AspectRatio w='full' ratio={16 / 9} borderRadius={'lg'} overflow={'hidden'}>
					<LazyLoadImage src={cover} alt={`Thumbnail of ${title}`} height={'full'} width={'full'} />
				</AspectRatio>
				<VStack alignItems='flex-start' flex={1} w='full' py={3} spacing={1}>
					<Heading size='sm'>{title}</Heading>
					<Heading size='xs' color={'gray.500'}>
						{description}
					</Heading>
					<Text color='gray.500' fontSize='xs' textTransform='capitalize'>
						{tags.join(',')}
					</Text>
				</VStack>
			</MotionDiv>
		</Link>
	);
};

export default BookmarkCard;
