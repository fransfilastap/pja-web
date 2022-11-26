import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ErrorResponse, PostViewResponse } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostViewResponse | ErrorResponse>) {
	try {
		const slug = req.query.slug!.toString();
		if (req.method === 'GET') {
			const views = await prisma.postViews.findUnique({
				where: { slug }
			});

			return res.status(200).json({ total: Number(views?.views).toLocaleString() });
		}

		if (req.method === 'POST') {
			const newOrUpdatedViews = await prisma.postViews.upsert({
				where: { slug },
				create: {
					slug
				},
				update: {
					views: {
						increment: 1
					}
				}
			});

			return res.status(200).json({
				total: newOrUpdatedViews.views.toString()
			});
		}
	} catch (e) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return res.status(500).json({ message: e.message });
	}
}
