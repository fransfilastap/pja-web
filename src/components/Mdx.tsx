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


const Table = () => {
    return (

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>
    )
}


const components = {
    a: CustomLink,
    Image: RoundedImage,
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
