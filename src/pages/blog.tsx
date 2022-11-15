import { Layout } from "@/components/Layout";
import BasicMeta from "@/components/meta/BasicMeta";
import OpenGraphMeta from "@/components/meta/OpenGraphMeta";
import config from "@/lib/config";
import React, { FunctionComponent } from "react";
interface BlogPageProps{

}
const BlogPage: FunctionComponent<BlogPageProps> = ({ }: BlogPageProps): React.ReactElement => {
    
    const blogTitle:string = `Blog - ${config.site_title}`

    return (
        <Layout>
            <BasicMeta title={blogTitle} description={blogTitle} url={`${config.site_url}/blog`} />
            <OpenGraphMeta title={blogTitle}  />
        </Layout>
    )
}

export default BlogPage