import Container from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import cover from "../../../public/media/pja-cover.jpeg";

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
        Sebuah Apresiasi Kepada "Non Litigation Peacemaker"
      </h1>
      <article className="prose prose-lg font-body">
        <p>
          Paralegal Justice Award adalah sebuah anugerah yang ditujukan kepada
          Kepala Desa atau Lurah yang telah memberikan pengabdian tinggi dengan
          bertindak sebagai Non Litigation Peacemaker (Juru Damai Desa).
        </p>
        <p>
          Paralegal Justice Award ini merupakan gotong royong kolaboratif antara
          Kementerian Hukum dan Hak Asasi Manusia (Kemenkumham) melalui BPHN,
          Mahkamah Agung (MA) dan Badan Pembinaan Ideologi Pancasila (BPIP)
          serta didukung oleh Kementerian Desa, Pembangunan Daerah Tertinggal,
          dan Transmigrasi (Kemendes PDTT) dan Kementerian Dalam Negeri
          (Kemendagri).
        </p>
        <h3>Definisi</h3>
        <p>
          Paralegal merupakan salah satu komponen yang sangat penting dalam
          pencapaian akses terhadap keadilan, terutama dalam memberikan bantuan
          hukum dan pemberdayaan hukum kepada masyarakat.
        </p>
        <h3>Anubhawa Sasana Desa/Kelurahan Jagaddhita</h3>
        <p>
          Desa/kelurahan yang turut andil menyukseskan program prioritas
          pemerintah terkait pemulihan ekonomi nasional dengan fokus terhadap
          kemudahan berinvestasi, peningkatan sektor pariwisata dan pembukaan
          lapangan kerja.
        </p>
        <h3>Logo</h3>
        <Image src={cover} alt="PJA LOGO" />
      </article>
    </Container>
  );
}
