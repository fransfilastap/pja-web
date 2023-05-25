"use client";

import clsx from "clsx";
import Link from "next/link";
import Logo from "./logo";
import MobileMenuButton from "./mobile-menu-button";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useGlobalState } from "@/store";
import Portal from "./portal";
import { useOnClickOutside } from "@/hooks";
import clsxm from "@/helpers/clsxm";
import { useRouter } from "next/navigation";
import Button from "./button/button";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Navigation() {
  const { toggleMenu, menuOpen } = useGlobalState();
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenuHandler = () => {
    toggleMenu(false);
  };

  useOnClickOutside(menuRef, closeMenuHandler);

  return (
    <>
      <header
        className={clsx(
          "bg-white/30 backdrop-blur-md rounded-xl flex flex-row justify-between items-center sticky top-4 px-4 py-4 w-[90%] lg:w-[1107px] mx-auto z-40"
        )}
      >
        <Logo />
        <nav className="hidden gap-8 lg:inline-flex">
          <NavigationMenuItem url="/kandidat">Kandidat</NavigationMenuItem>
          <NavigationMenuItem url="/blog">Berita</NavigationMenuItem>
          <NavigationMenuItem url="/pengumuman">Pengumuman</NavigationMenuItem>
          <NavigationMenuItem url="/about">Tentang</NavigationMenuItem>
        </nav>
        {!session?.user ? (
          <Button className="hidden lg:block" onClick={() => signIn()}>
            Login
          </Button>
        ) : (
          <button className="hidden lg:block" onClick={() => signOut()}>
            Logout
          </button>
        )}
        <MobileMenuButton
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleMenu()}
        />
      </header>
      <AnimatePresence>
        <Portal id="menu-container-wrapper">
          {menuOpen && (
            <>
              <motion.div
                onClick={closeMenuHandler}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-full h-[100vh] z-[999] bg-black/30 backdrop-blur-md"
              ></motion.div>

              <motion.div className="fixed z-[9999] inset-0 flex flex-col items-center justify-start p-4">
                <motion.div
                  ref={menuRef}
                  initial={{ y: -500 }}
                  animate={{ y: 0 }}
                  exit={{ y: -500 }}
                  transition={{ type: "spring", stiffness: 75, delay: 0.04 }}
                  className="flex flex-col w-full gap-2 p-4 bg-white border border-gray-100 rounded-lg shadow-md"
                >
                  <nav className="flex flex-col gap-2">
                    <MobileNavigationMenuItem url="/kandidat">
                      Kandidat
                    </MobileNavigationMenuItem>
                    <MobileNavigationMenuItem url="/blog">
                      Berita
                    </MobileNavigationMenuItem>
                    <MobileNavigationMenuItem url="/about">
                      Tentang
                    </MobileNavigationMenuItem>
                  </nav>
                  {!session?.user ? (
                    <Button onClick={() => signIn()}>Login</Button>
                  ) : (
                    <button onClick={() => signOut()}>Logout</button>
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </Portal>
      </AnimatePresence>
    </>
  );
}

function NavigationMenuItem({
  url,
  children,
  className,
}: {
  url: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={url}
      className={clsxm(
        "text-black font-display hover:text-[#5941A9] transition-colors duration-100 ease-in uppercase text-sm font-[500]",
        className
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavigationMenuItem({
  url,
  children,
  className,
}: {
  url: string;
  children: string;
  className?: string;
}) {
  const router = useRouter();
  const { toggleMenu, menuOpen } = useGlobalState();

  const clickHandler = () => {
    toggleMenu(false);
    router.push(url);
  };

  return (
    <span
      onClick={clickHandler}
      className={clsxm(
        "text-black font-display hover:text-[#5941A9] transition-colors duration-100 ease-in uppercase text-xl font-[500]",
        className
      )}
    >
      {children}
    </span>
  );
}
