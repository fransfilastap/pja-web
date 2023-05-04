import clsx from "clsx";
import Container from "./container";
import Link from "next/link";
import Logo from "./logo";

export default function Navigation() {
    return (
        <header className={clsx('bg-white/30 backdrop-blur-md rounded-xl flex flex-row justify-between items-center sticky top-4 px-8 py-4 w-[90%] lg:w-[1107px] mx-auto z-40')}>
            <Logo />
            <nav className="inline-flex gap-8">
                <NavigationMenuItem url="/about">
                    About
                </NavigationMenuItem>
                <NavigationMenuItem url="/blog">
                    Blog
                </NavigationMenuItem>
            </nav>
        </header>
    )
}


function NavigationMenuItem({ url, children }: { url: string, children: string }) {
    return (
        <Link href={url} className={"text-black font-display hover:text-[#5941A9] transition-colors duration-100 ease-in uppercase text-sm font-[500]"}>
            {children}
        </Link>
    )
}
