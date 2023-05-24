import Container from "@/components/container";

export default function Home() {
  return (
    <>
      <Container className="px-8 py-0">
        <Masthead />
        <HeroVideo />
        <Intro />
      </Container>
      <div className="bg-black">
        <Schedule />
        <CTA />
      </div>
    </>
  );
}

const Masthead = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-end">
      <h1 className="flex flex-col mt-28 mb-10 font-[500] font-body leading-none tracking-normal text-6xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
        <span>Paralegal</span>
        <span>Justice</span>
        <span>Awards 2023.</span>
      </h1>
    </div>
  );
};

const HeroVideo = () => {
  return (
    <section className="relative flex flex-col items-start justify-start object-cover w-full px-10 border h-[10vh] overflow-clip rounded-xl">
      <video className="absolute top-0 left-0" autoPlay muted loop playsInline>
        <source
          src={
            "https://res.cloudinary.com/dyduzvx5b/video/upload/v1684892592/pexels-rostislav-uzunov-8303104-1920x1080-24fps_keb3gq.mp4"
          }
          type="video/mp4"
        />
      </video>
    </section>
  );
};

const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <p className="block mx-auto my-20 text-3xl md:text-4xl lg:text-5xl font-[400] text-black font-body w-full md:w-[600px] lg:w-[778px]">
        Apresiasi{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          "Non Litigation Peacemaker"
        </span>{" "}
        Kepada Lurah atau Kepala Desa yang telah berdedikasi sebagai aktor
        penting dalam mewujudkan perdamaian masyarakat di wilayahnya
      </p>
    </div>
  );
};

const Schedule = () => {
  return (
    <section className="bg-[#FFE66D] px-10 py-24 rounded-b-xl min-h-[100vh]">
      <Container className="flex flex-row">
        <div className="flex flex-col">
          <h3 className="text-6xl font-extrabold font-body">Schedule</h3>
          <h4 className="font-body font-[300] text-xl">Jadwal kegiatan</h4>
        </div>
      </Container>
      <Container className="mt-10">
        <table className="table w-full">
          <tbody>
            <tr className="border-y border-y-black ">
              <td className="w-1/3 py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  31/05/2023
                </p>
                <p className="lg:hidden mt-3 text-xl font-[300] font-heading">
                  Malam Penganugrahan
                </p>
              </td>
              <td className="hidden py-6 lg:grid">
                <p className="pl-10 text-xl lg:text-3xl font-[200] font-heading">
                  Malam Penganugrahan
                </p>
              </td>
            </tr>
            <tr className="border-y border-y-black ">
              <td className="py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  08/02/2023
                </p>
                <p className="lg:hidden mt-3 text-xl font-[300] font-heading">
                  Pembukaan Pendaftaran{" "}
                  <i className="italic">Paralegal Justice Award</i> dan{" "}
                  <i className="italic">Anubhawa Sasana Desa Jagaddhita</i>
                </p>
              </td>
              <td className="hidden py-6 lg:grid">
                <p className="pl-10 text-xl lg:text-3xl font-[200] font-heading">
                  Pembukaan Pendaftaran{" "}
                  <i className="italic">Paralegal Justice Award</i> dan{" "}
                  <i className="italic">Anubhawa Sasana Desa Jagaddhita</i>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </section>
  );
};

const CTA = () => {
  return (
    <Container className="px-10 py-10 bg-black">
      <p className="flex font-body flex-col text-4xl lg:text-9xl text-white font-[500] leading-tight">
        <span className="tracking-tight uppercase">
          <span className="text-amber-500">✺</span>STAY TUNED
        </span>
        <span className="my-2 text-2xl font-[600] uppercase font-heading text-[#FFE66D]">
          Voting dimulai 26/05/2023
        </span>
      </p>
    </Container>
  );
};
