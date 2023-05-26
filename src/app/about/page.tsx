import Container from "@/components/container";
import { Metadata } from "next";
import Image from "next/image";
import cover from "../../../public/media/pja-cover.jpeg";
import Link from "next/link";
import PJAStory from "../story";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Tentang Paralegal Justice Awards",
};

export default function Home() {
  return (
    <Container className="flex flex-col gap-2 p-10 my-20 lg:flex-row">
      <section className="flex flex-col flex-1">
        <h3 className="my-10 font-[600] text-xl uppercase font-heading text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          Tentang
        </h3>
        <article className="prose prose-lg font-body">
          <h3>Paralegal Justice Award</h3>
          <p>
            Merupakan Anugerah yang diberikan kepada Kepala Desa/Lurah atau
            sebutan lainnya yang telah secara nyata berperan sebagai “hakim
            perdamaian” dalam penyelesaian konflik, sengketa, yang ada di
            masyarakat, serta membuat keadaan desa menjadi aman, damai, dan
            sadar hukum, sehingga tercipta iklim investasi, pariwisata, dan
            lapangan kerja yang baik di wilayah tersebut.
          </p>
          <p>
            Paralegal Justice Award ini merupakan kerja bersama antara
            Kementerian Hukum dan Hak Asasi Manusia (Kemenkumham) melalui BPHN,
            Mahkamah Agung (MA) serta didukung oleh Kementerian Desa,
            Pembangunan Daerah Tertinggal, dan Transmigrasi (Kemendes PDTT) dan
            Kementerian Dalam Negeri (Kemendagri).
          </p>
          <h3>Non Litigation Peacemaker</h3>
          <p>
            Apresiasi yang diberikan kepada Kepala Desa/Lurah yang berperan
            dalam mendamaikan berbagai persoalan hukum warganya dengan cara
            memediasi, menegosiasi, serta dan melakukan kegiatan penyuluhan
            hukum, konsultasi hukum, serta membuat kantor desa/kelurahan sebagai
            pusat informasi, balai musyawarah dalam menyelesaikan
            persoalan-persoalan hukum warganya.
          </p>
          <h3>Anubhawa Sasana Desa/Kelurahan Jagaddhita</h3>
          <p>
            Apresiasi yang diberikan kepada Desa/Kelurahan yang telah
            menyukseskan dan mengembangkan program pemberdayaan masyarakat dalam
            rangka pemulihan ekonomi nasional dengan fokus terhadap kemudahan
            berinvestasi, peningkatan sektor pariwisata dan pembukaan lapangan
            kerja dengan tetap mempertahankan kearifan lokal dan adat-istiadat
            setempat.
          </p>
          <h3>Top 10 Favorit Publik Paralegal Justice Award 2023</h3>
          <p>
            Kepala Desa/Lurah yang mendapatkan dukungan terbanyak dari
            masyarakat melalui mekanisme voting melalui laman
            <Link href={"/kandidat"}> ini</Link> akan mendapatkan apresiasi
            dalam kategori Favorit Publik Paralegal Justice Award 2023.
          </p>
          <h3>Logo</h3>
          <Image src={cover} alt="PJA LOGO" />
        </article>
      </section>
      <PJAStory />
    </Container>
  );
}
