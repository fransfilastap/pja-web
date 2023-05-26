"use client";
import Container from "@/components/container";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <Container className="flex flex-col gap-2 px-10 py-10 bg-black divide-y-2 divide-white">
      <p className="flex font-body flex-col text-4xl lg:text-9xl text-white font-[500] leading-tight">
        <span className="tracking-tight uppercase">
          <span className="text-amber-500">✺</span>NON LITIGATION PEACEMAKER
          <span className="text-amber-500">✺</span>
        </span>
      </p>
      <p className="flex font-body flex-col text-4xl lg:text-9xl text-white font-[500] leading-tight">
        <span className="tracking-tight uppercase">
          <span className="text-amber-500">✺</span>Anubhawa Sasana{" "}
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl font-body font-[500] text-amber-500"
          >
            Desa/Kelurahan
          </motion.span>{" "}
          Jagaddhita
          <span className="text-amber-500">✺</span>
        </span>
      </p>
    </Container>
  );
};

export default CTA;
