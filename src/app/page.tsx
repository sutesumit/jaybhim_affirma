import AllSections from "./my_components/AllSections";
import Hero from "./my_components/Hero";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Hero />
      </div>
      <AllSections />
    </> 

  )
}
