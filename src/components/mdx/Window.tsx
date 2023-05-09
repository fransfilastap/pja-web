import React from "react";

export default function Window({children}:{children:React.ReactNode}){
    return (
        <div className={"border border-gray-100 rounded-lg"}>
            {children}
        </div>
    )
}
