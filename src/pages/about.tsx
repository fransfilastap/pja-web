import { Layout } from "@/components/Layout";
import BasicMeta from "@/components/meta/BasicMeta";
import OpenGraphMeta from "@/components/meta/OpenGraphMeta";
import config from "@/lib/config";
import React, { FunctionComponent } from "react";

interface AboutPageProps{

}
const AboutPage: FunctionComponent<AboutPageProps> = ({ }: AboutPageProps): React.ReactElement => {
    
    const pageTitle:string = `About - ${config.site_title}`

    return (
        <Layout>
            <BasicMeta title={pageTitle} description={pageTitle} url={`${config.site_url}/about`} />
            <OpenGraphMeta title={pageTitle}  />
        </Layout>
    )
}

export default AboutPage