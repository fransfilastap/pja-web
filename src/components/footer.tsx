import Link, { LinkProps } from "next/link";
import Container from "./container";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-t-[#171717]">
      <Container className="flex flex-row justify-between w-full px-10 py-10">
        <div className="flex flex-col w-full gap-2">
          <h5 className="font-thin text-white uppercase font-xs text-[13px] font-body">
            Navigasi
          </h5>
          <nav className="flex flex-col gap-0">
            <FooterLink href={"/"}>Beranda</FooterLink>
            <FooterLink href={"/about"}>Tentang</FooterLink>
            <FooterLink href={"/blog"}>Berita</FooterLink>
          </nav>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h5 className="font-thin text-white uppercase font-xs text-[13px] font-body">
            Kontak
          </h5>
          <nav className="flex flex-col gap-0">
            <FooterLink href={"tel:0821-6817-8530"}>Dorma</FooterLink>
            <FooterLink href={"tel:0822-2022-5605"}>Susan</FooterLink>
          </nav>
        </div>
      </Container>
      <Container className="flex flex-col items-center justify-between w-full px-10 py-10 text-xs font-thin text-white lg:flex-row">
        <p>
          {" "}
          &copy; {`${new Date().getFullYear()}`} BPHN. All Rights reserverd. |{" "}
          <FooterLink
            className="normal-case underline font-[400]"
            href={"/privacy"}
          >
            Kebijakan Privasi
          </FooterLink>
        </p>
        <p>
          Forked from{" "}
          <Link className="font-bold text-amber-500" href="https://fransfp.dev">
            fransfp.dev
          </Link>
        </p>
      </Container>
    </footer>
  );
}

type FooterLinkProps = ComponentPropsWithoutRef<"a"> & LinkProps;
const FooterLink: FunctionComponent<FooterLinkProps> = ({
  href,
  children,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className="text-white text-[13px] font-bold uppercase font-body"
      {...rest}
    >
      {children}
    </Link>
  );
};
