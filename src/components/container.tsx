import clsxm from "@/helpers/clsxm";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

const Container: FunctionComponent<ComponentPropsWithoutRef<"div">> = ({ children, className, ...rest }) => {
    return (
        <div className={clsxm("w-full lg:w-[1107px] mx-auto", className)} {...rest}>
            {children}
        </div>
    )
}

export default Container