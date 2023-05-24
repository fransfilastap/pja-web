import Container from "@/components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Tentang Paralegal Justice Awards",
};

export default function Home() {
  return (
    <Container className="p-10 my-20">
      <h3 className="my-10 font-[600] text-xl uppercase font-heading">
        Tentang
      </h3>
      <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75% lg:text-6xl mb-10 tracking-normal font-body font-[500] text-black">
        Sebuah Apresiasi {'"Non Litigation Peacemaker"'}
      </h1>
      <article className="prose prose-lg font-body">
        <p>
          Paralegal Justice Award merupakan apresiasi yang diberikan Kementerian
          Hukum dan HAM RI bekerja sama dengan Mahkamah Agung kepada
          lurah/kepala.desa yang telah berdedikasi sebagai aktor penting dalam
          mewujudkan perdamaian masyarakat di wilayahnya melalui penghargaan
          "Non Litigation Peacemaker".
        </p>
      </article>
    </Container>
  );
}
