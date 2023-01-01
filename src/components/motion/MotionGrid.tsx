import { HTMLChakraProps, SimpleGrid } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { FunctionComponent } from 'react';

export type MotionGridProps = Omit<HTMLChakraProps<'div'>, keyof HTMLMotionProps<'div'>> & HTMLChakraProps<'div'>;

const MotionGrid: FunctionComponent<MotionGridProps> = motion(SimpleGrid);
export default MotionGrid;
