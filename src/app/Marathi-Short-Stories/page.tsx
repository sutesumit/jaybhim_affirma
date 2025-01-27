import WritingsSnapscroll from "../my_components/image_bodies/writings_snapscroll";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col align-middle justify-center">

      <div className="text-container title m-10">Imagining Images</div>

      <WritingsSnapscroll />
      
      <div className="text-container m-5">
        <p className="font-rajdhani">
        Few convoluted flash-fictions titled by abstract visuals, in a secret pursuit of articulating & visualizing disturbed relationships with the self and others.</p>
      </div>
    </div> 

  )
}