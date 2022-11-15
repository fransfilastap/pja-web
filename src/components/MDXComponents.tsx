import Image, {ImageProps} from "next/image";
import Link from "next/link"
import {Box, chakra, Heading, Link as ChakraLink, Table, useColorModeValue} from "@chakra-ui/react";
import {ChakraNextImage, myLoader, shimmer, toBase64} from "@/components/ChakraNextImage";

const MDXHeading = (props:any) => {
  return (
      <Heading
          {...props}
          __css={{ _before:{
              content: "#"
                }
        }}
          _hover={{
              cursor:"pointer",
              _before:{
                  position: 'absolute',
                  content: `"#"`,

                  left:{base:-2,md:-5},
                  top:0
              }
          }}
          position="relative"
      >
          {props.children}
      </Heading>
  )
}

const CustomLink = (props:any) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href} {...props} passHref legacyBehavior>
                <ChakraLink
                    display="block"
                    position="absolute"
                    top={0}
                    left={0}
                    w="max-content"
                    h="full">
                    {props.children}
                </ChakraLink>
            </Link>
        );
    }

    return <ChakraLink
        cursor="pointer"
        target="_blank"
        rel="noopener noreferrer" {...props} />;
};

const MDXImage = (props:ImageProps)=>{
    return (
        <Image
            className={"mdx-image"}
            placeholder={"blur"}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(props.width! as number, props.height! as number))}`} {...props}/>
    )
}

const CustomTable = (props:any)=>{
    return (
        <Box as="div"
             w="full"
             position="relative"
             overflowX="scroll"
             border={1} borderColor={useColorModeValue("gray.100","gray.800")}>
            <Table {...props}>
                {props.children}
            </Table>
        </Box>
    )
}

const components = {
    img: MDXImage,
    a: CustomLink,
    table:CustomTable
}

export default components