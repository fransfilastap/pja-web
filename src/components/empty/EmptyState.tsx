import { Heading, Text } from '@chakra-ui/react';

interface EmptyStateProps {
	title: string;
	narrate: string;
}
export function EmptyState({ title, narrate }: EmptyStateProps) {
	return (
		<div>
			<Heading>{title}</Heading>
			<Text>{narrate}</Text>
		</div>
	);
}
