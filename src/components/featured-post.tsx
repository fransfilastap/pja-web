import { FunctionComponent } from "react"
import { StaticImageData } from "next/image"
import { BlogPostProps } from "./blog-post"
import SmoothLoadImage from "./smooth-load-image"


export interface FeaturedPostProps{
    featuredCover: StaticImageData | string,
    date: string,
    title: string,
    url: string
    timeToRead: string
}

const FeaturedPost:FunctionComponent<FeaturedPostProps> = ({featuredCover, date, timeToRead, title})=> {
    return (
        <div className="relative my-10">
            <SmoothLoadImage src={featuredCover} priority alt="featured post" className="h-[70vh]"/>
            <span className="absolute block p-1 text-xs font-light text-black bg-white left-6 top-6">Featured</span>
            <div className="absolute flex flex-col gap-2 bottom-6 left-6">
                <h3 className="p-1 text-5xl font-bold text-white font-heading ">{ title }</h3>
                <p className="text-sm font-light text-white uppercase">{ `${date} | ${timeToRead}` }</p>
            </div>
        </div>
    )
}

export default FeaturedPost
