import {chakra, HStack} from "@chakra-ui/react"
import Link from "next/link"
import ReadingTime from "./ReadingTime"
import ViewsCount from "./ViewsCount"

interface BlogPostCardProps{
    title: string,
    views: number,
    readingTime:string,
    slug: string
}

const BlogPostCard: React.FunctionComponent<BlogPostCardProps> = ({ title, views,readingTime,slug }: BlogPostCardProps): React.ReactElement => {
    return (
        <Link href={`/blog/${slug}`}>
            <chakra.article
                display="flex"
                flexDir="column"
                justifyContent="space-between"
                minH={{base:'100%',md:'30vh'}}
                minW={{ base: "15vh", md: "25vh" }}
                border="4px"
                borderColor="violet.10"
                cursor="pointer"
                _hover={{borderColor:"violet.50"}}
                borderRadius="xl"
                transition="ease-in-out 0.1s"
                p={3}
                
            >
                <chakra.h1 fontWeight="semibold" fontSize="lg">{title}</chakra.h1>
                <HStack>
                    <ViewsCount count={views} />
                    <ReadingTime>{readingTime}</ReadingTime>
                </HStack>
            </chakra.article>
        </Link>
    )
}

export default BlogPostCard