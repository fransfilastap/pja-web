import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import {ComponentPropsWithoutRef, FunctionComponent, useState} from "react";


type CustomLinkProps = ComponentPropsWithoutRef<"a">
const CustomLink:FunctionComponent<CustomLinkProps> = (props) => {
    const href = props.href;

    if (href?.startsWith('/')) {
        return (
            <Link href={href!}>
                {props.children}
            </Link>
        );
    }

    if (href?.startsWith('#')) {
        return <a {...props} />;
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};



const RoundedImage:FunctionComponent<ImageProps> = (props) =>{
    
	return (
		<Image
			{...props}
			className={'rounded-lg'}
			placeholder='blur'
			{...props}
        />
    )
}



const components = {
    a: CustomLink,
    Image: RoundedImage
};

interface MdxProps {
    code: string;
}
export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);
    return (
        <article className="leading-normal tracking-normal prose prose-lg font-body">
            <Component components={components} />
        </article>
    );
}
