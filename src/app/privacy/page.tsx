import Container from "@/components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan Privasi",
};

export default function Home() {
  return (
    <Container className="p-10 my-20">
      <h1 className="font-[600] text-xl uppercase font-heading">
        Kebijakan Privasi
      </h1>
      <p className="text-sm font-body font-[400] text-gray-500">
        Versi 25 Mei 2023
      </p>
      <article className="mt-10 prose">
        <p>
          MOHON UNTUK MEMBACA SELURUH KEBIJAKAN PRIVASI DENGAN CERMAT DAN TELITI
          SEBELUM MENGGUNAKAN MENGGUNAKAN SETIAP FITUR DAN/ATAU LAYANAN YANG
          TERSEDIA DALAM LAMAN PARALEGAL JUSTICE AWARDS
        </p>
        <p>
          Kebijakan Privasi ini akan menjelaskan jenis data pribadi yang akan
          diproses oleh Badan Pembinaan Hukum Nasional sehubungan dengan proses
          voting Top Ten Favorit Publik Paralegal Justice Award
        </p>
        <p>
          Kami menghargai privasi Anda dan ingin memastikan bahwa informasi
          pribadi Anda aman saat menggunakan aplikasi voting kami. Kebijakan
          privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
          melindungi informasi yang kami ambil dari Anda. Mohon baca dengan
          seksama.
        </p>
        <h3>Pengumpulan Informasi:</h3>
        <p>
          Kami hanya mengumpulkan alamat email Anda saat Anda menggunakan
          aplikasi voting kami. Informasi ini dikumpulkan melalui formulir
          pendaftaran atau proses login yang diperlukan untuk mengakses fitur
          voting kami. Kami tidak akan mengumpulkan informasi pribadi lainnya
          kecuali jika diperlukan dan dengan persetujuan Anda.
        </p>
        <h3>Penggunaan Informasi:</h3>
        <ol type="a">
          <li>
            Verifikasi Akun: Alamat email yang Anda berikan digunakan untuk
            memverifikasi keaslian akun Anda. Ini membantu mencegah
            penyalahgunaan dan memastikan bahwa setiap suara yang Anda berikan
            valid.
          </li>
          <li>
            Pemberitahuan: Kami dapat menggunakan alamat email Anda untuk
            mengirimkan pemberitahuan terkait dengan proses voting, seperti
            pembaruan, pengumuman, atau informasi penting lainnya terkait dengan
            aplikasi voting kami.
          </li>
          <li>
            Analisis dan Peningkatan: Kami dapat menggunakan alamat email Anda
            secara anonim untuk tujuan analisis statistik dan perbaikan
            aplikasi. Hal ini membantu kami memahami preferensi pengguna dan
            meningkatkan pengalaman pengguna secara keseluruhan.
          </li>
        </ol>
        <h3>Pengungkapan Informasi:</h3>
        <p>
          Kami tidak akan membagikan alamat email Anda kepada pihak ketiga tanpa
          izin Anda, kecuali jika diwajibkan oleh hukum atau jika diperlukan
          dalam keadaan tertentu yang diatur dalam kebijakan privasi ini.
        </p>
        <h3>Keamanan Informasi:</h3>
        <p>
          Kami mengambil langkah-langkah keamanan yang sesuai untuk melindungi
          alamat email yang Anda berikan dari akses yang tidak sah,
          pengungkapan, atau penggunaan yang tidak sah. Kami menggunakan
          teknologi dan praktik keamanan yang tepat untuk menjaga kerahasiaan
          informasi Anda.
        </p>
        <h3>Penyimpanan Informasi:</h3>
        <p>
          Kami menyimpan alamat email yang Anda berikan dalam sistem kami dengan
          waktu yang diperlukan untuk tujuan yang dijelaskan dalam kebijakan
          privasi ini. Kami akan menghapus alamat email Anda dari sistem kami
          setelah tidak lagi relevan atau jika Anda meminta untuk dihapus.
        </p>
        <h3>Perubahan Kebijakan Privasi:</h3>
        <p>
          Kami dapat mengubah kebijakan privasi ini dari waktu ke waktu.
          Perubahan tersebut akan diberlakukan sesuai dengan ketentuan yang
          berlaku dan akan diumumkan secara jelas.
        </p>
        <h3>Kontak Kami:</h3>
        <p>
          Jika Anda memiliki pertanyaan atau masalah terkait dengan kebijakan
          privasi ini, silakan hubungi kami melalui informasi kontak yang
          tersedia di aplikasi voting kami. Kebijakan privasi ini berlaku sejak
          tanggal diterbitkannya dan tetap berlaku selama Anda menggunakan
          aplikasi voting kami. Mohon dicatat bahwa kami tidak bertanggung jawab
          atas kebijakan privasi atau praktik pihak ketiga yang mungkin Anda
          akses melalui aplikasi kami.
        </p>
      </article>
    </Container>
  );
}
