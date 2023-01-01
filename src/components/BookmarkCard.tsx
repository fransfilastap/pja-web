import React, { FunctionComponent } from 'react';
import { Bookmark } from '@/types';
import Link from 'next/link';
import MotionDiv from '@/components/motion/MotionDiv';
import { AspectRatio, Heading, Text, VStack } from '@chakra-ui/react';
import LazyLoadImage from '@/components/Image';
import { MotionProps } from 'framer-motion';

export type BookmarkCardProps = Omit<MotionProps, 'transition'> & {
	bookmark: Bookmark;
};
const BookmarkCard: FunctionComponent<BookmarkCardProps> = (props) => {
	const { bookmark, ...motion } = props;
	const { link, tags, description, title, cover } = bookmark;
	return (
		<Link href={link}>
			<MotionDiv overflow={'hidden'} {...motion}>
				<AspectRatio w='full' ratio={16 / 9} borderRadius={'lg'} overflow={'hidden'}>
					<LazyLoadImage src={cover} alt={`Thumbnail of ${title}`} fill sizes={'100vw'} asThumbnail />
				</AspectRatio>
				<VStack alignItems='flex-start' flex={1} w='full' py={3} spacing={1}>
					<Heading size='sm'>{title}</Heading>
					<Heading size='xs' color={'gray.500'} textTransform={'capitalize'}>
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
