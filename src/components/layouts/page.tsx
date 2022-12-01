import React, { FunctionComponent } from 'react';
import { Layout } from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import config from '@/config';
import { Content } from '@/types';
import { Container, MarkdownContent } from '@/components/ContentComponent';

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
			</Container>
		</Layout>
	);
};

export default PageLayout;
