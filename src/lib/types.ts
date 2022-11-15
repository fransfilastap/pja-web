import {MDXRemoteSerializeResult} from "next-mdx-remote";
import {ReadTimeResults} from "reading-time";

export type Post = {
    title:string,
    slug:string,
    description:string,
    viewsCount:number,
    readingTime:string,
    content: MDXRemoteSerializeResult,
    date: string,
    images?:string[]
}

export interface Hash {
    [key: string]: any;
}

export type MatterParsedResult = {
    fullpath?: string,
    readingTime: string,
    title:string,
    slug: string,
    date: string,
    author: string,
    description?: string,
    images?:string[]
    tags?: string[],
    lastmod?: Date
}

export type MDXParsedResult = {
    html: MDXRemoteSerializeResult,
    matter:MatterParsedResult,
    estimatedReadingTime: ReadTimeResults,
    wordCount: number
}