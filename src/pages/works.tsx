import { Layout } from "@/components/Layout";
import BasicMeta from "@/components/meta/BasicMeta";
import OpenGraphMeta from "@/components/meta/OpenGraphMeta";
import config from "@/lib/config";
import React, { FunctionComponent } from "react";

interface WorksPageProps{

}
const WorksPage: FunctionComponent<WorksPageProps> = ({ }: WorksPageProps): React.ReactElement => {
    
    const pageTitle:string = `Portofolio - ${config.site_title}`

    return (
        <Layout>
            <BasicMeta title={pageTitle} description="Frans Filasta Pratama's Portofolio" url={`${config.site_url}/works`} />
            <OpenGraphMeta title={pageTitle}  />
        </Layout>
    )
}

export default WorksPage