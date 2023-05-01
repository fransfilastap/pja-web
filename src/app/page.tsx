import Container from "@/components/container"

export default function Home() {
  return (
    <>
      <Container className='px-8 py-0'>
        <Masthead />
        <HeroVideo />
        <Intro />
      </Container>
      <div className="bg-black">
        <Portofolio />
        <CTA />
      </div>
    </>
  )
}


function Masthead() {
  return (
    <h1 className="mt-28 mb-10 font-[400] md:font-[500] font-body leading-tight tracking-normal text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-[#FCAA43] from-5% via-[#943C30] via-20% to-[#5941A9] to-75%">
      Empowering Innovation and Efficiency through Code.
    </h1>
  )
}


function HeroVideo() {
  return (
    <section className="flex flex-col justify-end items-start px-10 h-[60vh] w-full object-cover relative overflow-clip">
      <video src={require('../../public/hero-video.mp4')} className="absolute top-0 left-0" autoPlay muted loop />
      <h2 className="absolute z-30 font-serif text-transparent bg-white/40 bg-clip-text text-9xl">Hello.</h2>
    </section>
  )
}


function Intro() {
  return (
    <p className="block mx-auto my-20 text-3xl md:text-4xl lg:text-5xl font-[400] text-black font-body w-full md:w-[600px] lg:w-[778px]">
      I’m a versatile and experienced full-stack developer, having worked for both government and private companies over the course of my eight-year career.
    </p>
  )
}

function Portofolio() {
  return (
    <section className="bg-[#FFE66D] rounded-b-xl">
      <Container className="flex flex-row px-10 py-24">
        <div className="flex flex-col">
          <h3 className="font-heading font-[800] text-3xl">My Works.</h3>
          <h4 className="font-body font-[300] text-xl">Taking on issues that matter.</h4>
        </div>
        <div className="flex-1 hidden mt-2 border-t lg:flex border-t-black"></div>
      </Container>
      <Container className="grid grid-flow-row grid-cols-1 gap-2 md:grid-flow-col md:grid-cols-2">
        <PortpolioCard />
      </Container>
    </section>
  )
}

function CTA() {
  return (
    <Container className="px-10 py-10 bg-black">
      <p className="flex font-serif flex-col tracking-wider text-4xl lg:text-[50pt] text-white font-[300] leading-tight">
        <span>✺LET’S COLLABORATE</span>
        <span className="my-2 font-serif text-lg">mail@fransfp.dev</span>
      </p>
    </Container>
  )
}


function PortpolioCard() {
  return (
    <div className="flex flex-col">

    </div>
  )
}