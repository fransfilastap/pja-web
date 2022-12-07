import React, { FunctionComponent } from 'react';
import { Layout } from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import config from '@/config';
import { Content } from '@/types';
import { Container, MarkdownContent } from '@/components/ContentComponent';
import { Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

export type PageProps = {
	content: Content;
};

const PageLayout: FunctionComponent<PageProps> = ({ content }: PageProps): React.ReactElement => {
	const pageTitle = content.matter.title;

	return (
		<Layout>
			<BasicMeta
				title={content.matter.title}
				description={content.matter.description}
				keywords={content.matter.keywords}
				author={config.site_url}
				url={`${config.site_url}/${content.matter.slug}`}
			/>
			<OpenGraphMeta title={pageTitle} />
			<Container maxW={'container.md'}>
				<MarkdownContent content={content} />
				{content.matter.lastmod ? (
					<Text mt={8} fontSize={{ base: 'sm', md: 'sm' }} color={'gray.500'}>{`Last edited at ${format(
						parseISO(content.matter.lastmod),
						'MMMM dd, yyyy'
					)}`}</Text>
				) : (
					''
				)}
			</Container>
		</Layout>
	);
};

export default PageLayout;
