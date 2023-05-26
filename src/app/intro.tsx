import ParallaxText from "@/components/parallax-text";

const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] my-20">
      <p className="block mx-auto my-20 text-3xl md:text-4xl lg:text-5xl font-[400] text-black font-body w-full md:w-[600px] lg:w-[778px]">
        Apresiasi{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
          "Non Litigation Peacemaker"
        </span>{" "}
        Kepada Lurah atau Kepala Desa yang telah berdedikasi sebagai aktor
        penting dalam mewujudkan perdamaian masyarakat di wilayahnya.
      </p>
    </div>
  );
};

export default Intro;
