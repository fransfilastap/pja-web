import { GetStaticProps, NextPage } from 'next';
import PageLayout, { PageProps } from '@/components/layouts/page';
import { parseContent } from '@/lib/content-parser';
import React from 'react';

const ColophonPage: NextPage<PageProps> = (props) => <PageLayout content={props.content} />;

export default ColophonPage;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
	const about = await parseContent('colophon', 'pages');
	return {
		props: {
			content: JSON.parse(JSON.stringify(about))
		}
	};
};
