import Container from "@/components/container";
import PJAStory from "./story";
import CTA from "./cta";
import Intro from "./intro";
import ParallaxText from "@/components/parallax-text";

export default function Home() {
  return (
    <>
      <Container className="px-8 py-0 overflow-clip">
        <Masthead />
        <HeroVideo />
        <Intro />
      </Container>
      <ParallaxText baseVelocity={-3}>NON LITIGATION PEACEMAKER</ParallaxText>

      <div className="bg-black">
        <Schedule />
      </div>
      <ParallaxText baseVelocity={3}>
        Anubhawa Sasana Desa/Kelurahan Jagaddhita
      </ParallaxText>
    </>
  );
}

const Masthead = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-end">
      <h1 className="flex flex-col mt-28 mb-10 font-[500] font-body leading-none tracking-normal text-6xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
        <span>Paralegal</span>
        <span>Justice</span>
        <span>Award 2023.</span>
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
              <td className="py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  08 Feb 2023
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
            <tr className="border-y border-y-black ">
              <td className="w-1/3 py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  26 Mei - 1 Juni 2023
                </p>
                <p className="lg:hidden mt-3 text-xl font-[300] font-heading">
                  Voting Top Ten Favorit Publik Paralegal Justice Award
                </p>
              </td>
              <td className="hidden py-6 lg:grid">
                <p className="pl-10 text-xl lg:text-3xl font-[200] font-heading">
                  Voting Top Ten Favorit Publik Paralegal Justice Award
                </p>
              </td>
            </tr>
            <tr className="border-y border-y-black ">
              <td className="w-1/3 py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  29 Mei 2023
                </p>
                <p className="lg:hidden mt-3 text-xl font-[300] font-heading">
                  Mei Pembukaan Paralegal Justice Academy dan Paralegal Justice
                  Award
                </p>
              </td>
              <td className="hidden py-6 lg:grid">
                <p className="pl-10 text-xl lg:text-3xl font-[200] font-heading">
                  Pembukaan Paralegal Justice Academy dan Paralegal Justice
                  Award
                </p>
              </td>
            </tr>
            <tr className="border-y border-y-black ">
              <td className="w-1/3 py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  30 - 31 Mei 2023
                </p>
                <p className="lg:hidden mt-3 text-xl font-[300] font-heading">
                  Paralegal Academy
                </p>
              </td>
              <td className="hidden py-6 lg:grid">
                <p className="pl-10 text-xl lg:text-3xl font-[200] font-heading">
                  Paralegal Academy
                </p>
              </td>
            </tr>
            <tr className="border-y border-y-black ">
              <td className="w-1/3 py-6">
                <p className="text-xl lg:text-3xl font-heading pr-6 font-[800] text-slate-950">
                  1 Juni 2023
                </p>
                <p className="lg:hidden mt-3 text-xl font-[300] font-heading">
                  Malam Penganugerahan Paralegal Justice Award
                </p>
              </td>
              <td className="hidden py-6 lg:grid">
                <p className="pl-10 text-xl lg:text-3xl font-[200] font-heading">
                  Malam Penganugerahan Paralegal Justice Award
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </section>
  );
};
