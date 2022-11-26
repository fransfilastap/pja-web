import Head from 'next/head';

import Config from '@/lib/config';

interface BasicMetaProps {
	title?: string;
	description?: string;
	url?: string;
	keywords?: string;
	author?: string;
}

export default function BasicMeta({ title, description, url, keywords, author }: BasicMetaProps) {
	return (
		<Head>
			<title>{title ? title : Config.site_title}</title>
			<meta name='description' content={description || Config.site_description} />
			<meta name='keywords' content={keywords ? keywords : Config.site_keywords.map((it) => it.keyword).join(',')} />
			{author ? <meta name='author' content={author} /> : null}
			<link rel='icon' type='image/x-icon' href='/favicon/favicon.ico' />
			<link rel='canonical' href={url ? url : Config.site_url} />
		</Head>
	);
}
