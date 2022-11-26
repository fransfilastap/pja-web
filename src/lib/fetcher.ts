/**
 * SWR fetcher
 *
 * @param input
 * @param init
 * @return {Promise<JSON>}
 */
export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
	const res = await fetch(input, init);
	return res.json();
}
