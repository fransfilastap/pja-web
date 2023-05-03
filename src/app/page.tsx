import Container from "@/components/container"
import PortfolioCard from "@/components/portfolio"
import cover from "../../public/media/cover-portofolio.jpg"

export default function Home() {
  return (
    <>
      <Container className='px-8 py-0'>
        <Masthead />
        <HeroVideo />
        <Intro />
      </Container>
      <div className="bg-black">
        <PortfolioItems />
        <CTA />
      </div>
    </>
  )
}


const Masthead = () =>{
  return (
    <h1 className="mt-28 mb-10 font-[400] md:font-[500] font-body leading-tight tracking-normal text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
      Empowering Innovation and Efficiency through Code.
    </h1>
  )
}


const HeroVideo = () => {
  return (
    <section className="flex flex-col justify-end items-start px-10 h-[60vh] w-full object-cover relative overflow-clip">
      <video src={require('../../public/hero-video.mp4')} className="absolute top-0 left-0" autoPlay muted loop />
      <h2 className="absolute z-30 font-serif text-transparent bg-white/40 bg-clip-text text-9xl">Hello.</h2>
    </section>
  )
}


const Intro = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
    <p className="block mx-auto my-20 text-3xl md:text-4xl lg:text-5xl font-[400] text-black font-body w-full md:w-[600px] lg:w-[778px]">
      I’m a versatile and experienced full-stack developer, having worked for both government and private companies over the course of my eight-year career.
    </p>
    </div>
  )
}

const PortfolioItems = ()=> {
  return (
    <section className="bg-[#FFE66D] px-10 py-24 rounded-b-xl">
      <Container className="flex flex-row">
        <div className="flex flex-col">
          <h3 className="text-3xl font-extrabold font-body">Featured Works.</h3>
          <h4 className="font-body font-[300] text-xl">Taking on issues that matter.</h4>
        </div>
      </Container>
      <Container className="grid grid-flow-row grid-cols-1 gap-4 my-8 md:grid-flow-col md:grid-cols-2">
        <PortfolioCard
          coverUrl={cover}
          name="GEOL"
          type="Telecommunication, Web" />
        <PortfolioCard
          coverUrl={cover}
          name="Golden Site TDC"
          type="Telecommunication, Web" />
      </Container>
    </section>
  )
}

const CTA = ()=> {
  return (
    <Container className="px-10 py-10 bg-black">
      <p className="flex font-body flex-col text-4xl lg:text-9xl text-white font-[500] leading-tight">
        <span className="tracking-tight">✺LET’S COLLABORATE</span>
        <span className="my-2 text-2xl font-[600] uppercase font-heading text-[#FFE66D]">mail@fransfp.dev</span>
      </p>
    </Container>
  )
}