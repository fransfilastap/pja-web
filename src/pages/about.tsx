import { Layout } from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import config from '@/lib/config';
import React, { FunctionComponent } from 'react';
import { GetStaticProps } from 'next';
import { parseContent } from '@/lib/content-parser';
import { Content } from '@/lib/types';
import { Container, MarkdownContent } from '@/components/ContentComponent';

interface AboutPageProps {
	about: Content;
}

const AboutPage: FunctionComponent<AboutPageProps> = ({ about }: AboutPageProps): React.ReactElement => {
	const pageTitle = about.matter.title;

	return (
		<Layout>
			<BasicMeta
				title={about.matter.title}
				description={about.matter.description}
				keywords={about.matter.keywords}
				author={config.site_url}
				url={`${config.site_url}/blog/${about.matter.slug}`}
			/>
			<OpenGraphMeta title={pageTitle} />
			<Container maxW={'container.md'}>
				<MarkdownContent content={about} />
			</Container>
		</Layout>
	);
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
	const about = await parseContent('about', 'pages');
	return {
		props: {
			about: JSON.parse(JSON.stringify(about))
		}
	};
};
