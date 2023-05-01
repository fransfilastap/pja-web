import Link from "next/link";
import Container from "./container";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-t-[#171717]">
            <Container className="flex flex-row justify-between w-full px-10 py-10">
                <div className="flex flex-col gap-2">
                    <h5 className="font-thin text-white uppercase font-xs text-[13px] font-body">Navigate</h5>
                    <nav className="flex flex-col gap-0">
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">Home</Link>
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">About</Link>
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">Works</Link>
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">Colophon</Link>
                    </nav>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="font-thin text-white uppercase font-xs text-[13px] font-body">Contact</h5>
                    <nav className="flex flex-col gap-0">
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">Email</Link>
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">LinkedIn</Link>
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">Twitter</Link>
                        <Link href={"/"} className="text-white text-[13px] font-bold uppercase font-body">Github</Link>
                    </nav>
                </div>
            </Container>
            <Container className="w-full px-10 py-10 text-xs font-thin text-white">
                &copy; {`${new Date().getFullYear()}`} All Rights reserverd.
            </Container>
        </footer>
    )
}