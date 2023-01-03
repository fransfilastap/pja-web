import bm from '#/bookmarks/index.json';
import { Bookmark, BookmarkData, ResponsiveImage } from '@/types';
import { getPlaiceholder } from 'plaiceholder';
import cloudinary from '@/lib/cloudinary';

export default function fetchBookmarks(): Promise<Bookmark[]> {
	const bookmarksData = bm as BookmarkData[];

	return Promise.all(
		bookmarksData.map(async (bookmark) => {
			const { original } = cloudinary(bookmark.cover);
			const { base64 } = await getPlaiceholder(original);

			const responsiveCover: ResponsiveImage = {
				original: {
					placeholder: base64,
					source: original
				}
			};

			return {
				cover: responsiveCover,
				link: bookmark.link,
				tags: bookmark.tags,
				title: bookmark.title,
				description: bookmark.description
			} as Bookmark;
		})
	);
}
