import { FunctionComponent } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

export interface PortpolioCardProps {
    name: string
    year: number|string
    type: string,
    url:string
    coverUrl: StaticImageData|string
    description: string
}

const PortfolioCard: FunctionComponent<PortpolioCardProps> = ({name,description,url,year, type, coverUrl}) => {
    return (
        <Link href={url} className="flex flex-col group bg-[#FFFF9F] p-5 rounded-2xl">
            <Image src={coverUrl} alt={"cover"} className="rounded-lg my-3 aspect-video object-cover" />
            <span className="flex flex-col gap-1 max-w-fit">
                <span
                    className="block font-body uppercase text-lg md:text-2xl tracking-normal leading-tight font-[600]">
                    {name}
                </span>
                <span
                    className="text-sm font-[400] leading-tight tracking-normal uppercase text-black/80 md:text-sm font-body">
                    {type}
                </span>
                </span>
                <p className={"font-[300] text-sm"}>{description}</p>
        </Link>
    )
}

export default PortfolioCard
