import { FunctionComponent } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

export interface PortpolioCardProps {
    name: string
    type: string
    coverUrl: StaticImageData|string
}

const PortfolioCard: FunctionComponent<PortpolioCardProps> = ({name, type, coverUrl}) => {
    return (
        <Link href={'/'} className="flex flex-col group">
            <Image src={coverUrl} alt={"cover"} className="h-[381px] w-full" />
             <span className="flex flex-col my-2 max-w-fit">
                <span
                    className="after:transition after:duration-100 block font-body relative after:absolute after:top-0 after:-right-6 after:flex after:justify-end after:items-end after:content-['_↗'] after:opacity-0 group-hover:after:opacity-100 text-sm md:text-2xl tracking-normal leading-tight font-[500]">
                    {name}
                </span>
                <span
                    className="text-sm font-light leading-tight tracking-normal uppercase text-black/50 md:text-lg font-heading">
                    {type}
                </span>
      </span>
    </Link>
    )
}

export default PortfolioCard