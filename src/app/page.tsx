import AllSections from "./my_components/specific/AllSections";
import Hero from "./my_components/specific/Hero";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Hero />
      </div>
      <div className="" id='all-sections'>
        <AllSections />
      </div>
    </> 

  )
}
