import Head from 'next/head';
import Config from '@/config';

interface OpenGraphMetaProps {
	title?: string;
	description?: string;
	url?: string;
	image?: string;
}

function OpenGraphMeta({ title, description, url, image }: OpenGraphMetaProps) {
	const ogImage = image || `${Config.site_url}/images/me.jpg`;
	return (
		<Head>
			<meta property='og:title' content={title ? [title, Config.site_title].join(' | ') : Config.site_title} />
			<meta property='og:description' content={description || Config.site_description} />
			<meta property='og:type' content='article' />
			<meta property='og:url' content={url || Config.site_url} />
			<meta property='og:image' content={ogImage} />
			<meta property='og:image' content={ogImage} />
			<meta property='og:image:secure_url' content={ogImage} />

			<meta property='og:image:type' content='image/jpeg' />
			{/* Twitter */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:site' content={Config.twitter} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={ogImage} />
		</Head>
	);
}

export default OpenGraphMeta;
