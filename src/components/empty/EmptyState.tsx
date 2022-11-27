import { PropsWithChildren } from 'react';
import MotionDiv from '@/components/Motion';

export function EmptyState({ children }: PropsWithChildren) {
	return (
		<MotionDiv
			width={'full'}
			justifyContent={'center'}
			alignItems={'center'}
			height={{ base: '20vh', md: '50vh' }}
			display={'flex'}
			flexDir={'column'}>
			{children}
		</MotionDiv>
	);
}
