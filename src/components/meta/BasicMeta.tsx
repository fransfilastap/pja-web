import Head from "next/head";
import Config from "@/lib/config"

interface BasicMetaProps{
    title?: string,
    description?: string,
    url?: string,
    keywords?: string[],
    author?: string
}

const BasicMeta = ({title,description,url,keywords,author}:BasicMetaProps) => {
    return (
        <Head>
            <title>{ title ? [title, Config.site_title].join(" - ") : Config.site_title }</title>
            <meta name="description" content={description || Config.site_description} />
            <meta name="keywords" content={keywords ? keywords.join(",") : Config.site_keywords.map((it) => it.keyword).join(",")} />
            {author ? <meta name="author" content={author} /> : null}
            <link rel="icon" type="image/x-icon" href="/favicon.svg"/>
            <link rel="canonical" href={url?[Config.site_url,url].join('/'):Config.site_url} />        
        </Head>
    );
}

export default BasicMeta;