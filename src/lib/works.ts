import works from '../../works.json';

export type Work = {
	readonly name: string;
	readonly type: string;
	readonly url: string;
	readonly thumbnail: string;
};

export default works as Work[];
