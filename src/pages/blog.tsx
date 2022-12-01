import { Layout } from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import config from '@/config';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import BlogPostList from '@/components/BlogPostList';
import { GetStaticProps, NextPage } from 'next';
import { PostMetadata } from '@/types';
import { getPostLists } from '@/lib/content-parser';
import { POST_PER_PAGE } from '@/constants/pagination';
import { Container } from '@/components/ContentComponent';
import debounce from 'lodash.debounce';
import Masthead from '@/components/Masthead';

type BlogPageProps = {
	posts: PostMetadata[];
};

const BlogPage: NextPage<BlogPageProps> = (props) => {
	const { posts } = props;
	const blogTitle = `Blog - ${config.site_title}`;
	const [searchValue, setSearchValue] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	const debounceChange = debounce(handleChange, 300);

	const filteredPosts = useMemo(() => {
		return posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));
	}, [posts, searchValue]);

	return (
		<Layout>
			<BasicMeta title={blogTitle} description={blogTitle} url={`${config.site_url}/blog`} />
			<OpenGraphMeta title={blogTitle} />
			<Container display={'flex'} flexDir={'column'} gap={'4'} mt={5} maxW={'container.md'}>
				<Masthead title={'Blog'} subTitle={'Just some writings.'} />
				<InputGroup mb={10}>
					<InputLeftElement pointerEvents='none'>
						<FiSearch color='gray.300' />
					</InputLeftElement>
					<Input onChange={debounceChange} type={'text'} variant={'filled'} placeholder={'Search articles'} />
				</InputGroup>
				<BlogPostList posts={filteredPosts} />
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const posts = await getPostLists(1, POST_PER_PAGE);
	return {
		props: {
			posts
		}
	};
};

export default BlogPage;
