import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ReadTimeResults } from 'reading-time';

export type ContentMetadata = {
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
	lastmod?: Date;
};

export type Post = ParsedContent<PostMetadata>;
export type Content = ParsedContent<ContentMetadata>;

export interface Hash {
	[key: string]: any;
}

export type PostList = PostMetadata[];

export type PostMetadata = ContentMetadata & {
	fullPath: string;
	readingTime: ReadTimeResults;
};

export type ParsedContent<T extends ContentMetadata> = {
	html: MDXRemoteSerializeResult;
	matter: T;
};

export type ErrorResponse = {
	message: string;
};
export type PostViewResponse = {
	total: string;
};
