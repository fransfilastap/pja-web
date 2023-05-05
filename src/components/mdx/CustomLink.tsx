import Link from "next/link";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

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


export default CustomLink;