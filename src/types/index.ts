import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ReadTimeResults } from 'reading-time';

export type MatterContentMetadata = {
	title: string;
	slug: string;
	excerpt?: string;
	description: string;
	keywords?: string;
	tags: string[];
	date: string;
	cover: string;
	images?: string[];
	author: string;
	lastmod?: string;
};

export type Post = ParsedContent<PostMetadata>;
export type Content = ParsedContent<MatterContentMetadata>;

export interface Hash {
	[key: string]: any;
}

export type PostList = PostMetadata[];

export type PostMetadata = Omit<MatterContentMetadata, 'cover' | 'images'> & {
	cover: ResponsiveImage;
	images?: ResponsiveImage[];
	fullPath: string;
	readingTime: ReadTimeResults;
};

export type ParsedContent<T extends MatterContentMetadata | PostMetadata> = {
	html: MDXRemoteSerializeResult;
	matter: T;
};
export type ResponsiveImage = {
	thumbnail?: Image;
	original: Image;
};

export type Image = {
	placeholder: string;
	source: string;
};

export type ErrorResponse = {
	message: string;
};

export type PostViewResponse = {
	total: string;
};

export type BookmarkData = {
	title: string;
	cover: string;
	link: string;
	description: string;
	tags: string[];
};

export type Bookmark = Omit<BookmarkData, 'cover'> & {
	cover: ResponsiveImage;
};
