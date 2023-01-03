import { MatterContentMetadata, Hash, ParsedContent, PostList, PostMetadata, ResponsiveImage } from '@/types';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeImageSize from 'rehype-img-size';
import rehypeFigure from 'rehype-figure';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import fs from 'fs/promises';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getPlaiceholder } from 'plaiceholder';
import cloudinary from '@/lib/cloudinary';
import imageMetadata from '@/lib/image-metadata';

const rootDir = path.join(process.cwd(), 'content');
const postsDir = path.join(rootDir, 'posts');

/**
 * Get post lists
 *
 * @param page
 * @param limit
 * @param tag
 * @return {Promise<PostList>}
 */
export async function getPostLists(page: number, limit: number, tag?: string): Promise<PostList> {
	const posts = await getAllPostMeta();
	return posts
		.sort((a, b) => {
			if (a.date < b.date) {
				return 1;
			}
			return -1;
		})
		.filter((it) => !tag || (it.tags && it.tags.includes(tag)))
		.slice((page - 1) * limit, page * limit);
}

/**
 * Get markdown post content lists
 *
 * @return {Promise<PostList>} List of PostMetadata
 */
export async function getAllPostMeta(): Promise<PostList> {
	const slugPaths = await fs.readdir(path.join(postsDir));
	return Promise.all(
		slugPaths
			.filter((it) => it.endsWith('.mdx'))
			.map(async (slug) => {
				const content = await fs.readFile(path.join(postsDir, slug), 'utf8');
				const metadata = await getPostContentMeta(content);

				return {
					...metadata,
					fullPath: path.join(postsDir, slug)
				};
			})
	);
}

/**
 *
 * @param fileContent
 * @return {Promise<PostMetadata>} Post metadata from markdown file
 */
export async function getPostContentMeta(fileContent: string): Promise<PostMetadata> {
	const metadata = await getContentMetadata(fileContent);
	const { cover, ...rest } = metadata;
	const { original } = cloudinary(cover);
	const { base64 } = await getPlaiceholder(original);
	const responsiveCover: ResponsiveImage = {
		original: {
			placeholder: base64,
			source: original
		}
	};
	return {
		cover: responsiveCover,
		readingTime: readingTime(fileContent),
		...rest
	} as PostMetadata;
}

/**
 * Get front matter metadata from markdown file
 *
 * @param fileContent file source
 * @return {Promise<MatterContentMetadata>} - Parsed frontmatter data from markdown
 */
export async function getContentMetadata(fileContent: string): Promise<MatterContentMetadata> {
	const matterResult = matter(fileContent, {
		engines: {
			yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
		},
		excerpt: true
	});

	return matterResult.data as MatterContentMetadata;
}

/**
 * Parse a markdown post content
 *
 * @param slug
 * @return {Promise<ParsedContent>} async ParsedContent
 */
export async function parsePostContent(slug: string): Promise<ParsedContent<PostMetadata>> {
	const hash = slugToPostMetaData(await getAllPostMeta());
	const fileContent = await fs.readFile(hash[slug].fullPath, 'utf8');
	const parsedMarkdown = await parseMarkdown(fileContent);

	const parsedFrontMatter = await getPostContentMeta(fileContent);

	return {
		html: parsedMarkdown,
		matter: parsedFrontMatter
	} as ParsedContent<PostMetadata>;
}

export async function parseContent(slug: string, directory?: string): Promise<ParsedContent<MatterContentMetadata>> {
	const fileContent = await fs.readFile(
		`${path.join(directory ? path.join(rootDir, directory) : rootDir, slug)}.mdx`,
		'utf8'
	);
	const result = await parseMarkdown(fileContent);
	const matterData = await getContentMetadata(fileContent);

	return {
		html: result,
		matter: matterData
	} as ParsedContent<MatterContentMetadata>;
}

/**
 * Parse MDX
 *
 * @param fileContent
 * @return {Promise<MDXRemoteSerializeResult>} parsed mdx
 */
export async function parseMarkdown(fileContent: string): Promise<MDXRemoteSerializeResult> {
	return await serialize(fileContent, {
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						properties: {
							className: ['anchor']
						}
					}
				],
				rehypeCodeTitles,
				rehypePrism,
				rehypePrismPlus,
				[rehypeImageSize, { dir: 'public' }],
				[rehypeFigure, { className: ['figure'] }],
				imageMetadata
			],
			format: 'mdx'
		},
		parseFrontmatter: true
	});
}

/**
 * Mapping slug to PostMetadata
 *
 * @param {PostMetadata[]} posts
 * @return {Hash} Mapped slug to PostMetadata
 */
function slugToPostMetaData(posts: PostMetadata[]) {
	const hash: Hash = {};
	posts.forEach((it) => (hash[it.slug] = it));
	return hash;
}

type Pagination = {
	page: number | null;
	current: boolean;
	excerpt: boolean;
};

/**
 * Generate pagination
 *
 * @param current
 * @param pages
 * @return {Pagination[]} pagination
 */
export function generatePagination(current: number, pages: number): Pagination[] {
	return Array.from(Array(pages).keys())
		.map((it) => it + 1)
		.filter((it) => it === 1 || it === pages || Math.abs(current - it) <= 2)
		.map((it) => ({
			page: Math.abs(current - it) === 2 && it !== 1 && it !== pages ? null : it,
			current: it === current,
			excerpt: Math.abs(current - it) === 2 && it !== 1 && it !== pages
		}));
}
