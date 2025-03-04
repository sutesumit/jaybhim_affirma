import AllSections from "./my_components/specific/AllSections";
import Hero from "./my_components/specific/Hero";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen -mt-12 items-center justify-center">
        <Hero />
      </div>
      <AllSections />
    </> 

  )
}
