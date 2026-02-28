'use client'
import React from 'react'
import { TitleDiscription } from '@/app/my_components/PageTitleSection'
import { CommentsSection } from '@/app/my_components/CommentsSection/CommentsSection'
import Seperator from '@/app/my_components/shared/Seperator'
import AcknowledgementSection from '@/app/my_components/AcknowledgementSection/AcknowledgementSection'
import Videoscape from '@/app/my_components/specific/image_bodies/videoscape'

const content = {
  title: "Home // घर",
  description: {
    eng: "Photographing my parents has been a private experience for me. Initially, I started taking their pictures with an intention to record my mother’s recovery from schizophrenia and my father’s recovery from long term depression. Although, the act of photographing them has mostly been helping me to visually articulate and re-establish the emotional intimacy in my relationship with them.\n\nThe inability to be always mindful of anxieties and to express verbally and communicate the feelings has always had a crippling effect on our familial environment. As we are healing through generational and familial traumas together, I personally find the intentional and specific act of making a family portrait very burdening. For me, the ultimate aim of the engagement with photography is to heal and beget self compassion.",
    mar: "आईवडिलांचे फोटोज काढणे तशी माझ्यासाठी खूप व्यक्तीगत गोष्ट आहे. सुरुवातीला मला वाटलेलं कि आईची स्कीझोफ्रेनियातुन आणि पप्पांची दीर्घ नैराश्यातून होणारी सुधारणा मी 'डॉक्युमेन्ट’ करत आहे. खरं तर त्या फोटो काढण्यांतून मला आमचं डळमळलेलं नातं समजण्यासाठी-जुळवण्यासाठी भावनिक भाषा सापडत जात आहे.\n\nजीवाला लागलेले घोर नेहमीच शब्दांत घालून ठेवता येतात किंवा भावनांना नेहमीच बडबडायला येतं असं नाही, पण तरीही नात्यांच्या पांगुळलेपणावर त्यामुळे व्हायचा तो परिणाम होतोच. पिढीजात आणि कौटुंबिक आघातांमधून भरून येत असताना मुद्दामहून काढायचे फॅमिली ग्रुप फोटो खूप तकलादू, दिखाऊ आणि थोडे कामचुकार वाटतात. जखमा भरवून स्व-स्नेह रुजवणे हेच कलेशी असलेल्या नात्याचं माझ्यासाठी परमोच्च ध्येय.",
  },
}

const background = (
  <Videoscape 
    src="https://www.youtube.com/embed/llARFMPOTB0?start=1137&autoplay=1&mute=1&controls=0&loop=1&playlist=llARFMPOTB0&modestbranding=1&showinfo=0&rel=0"
    bg_value="bg-white"
  />
)

const Home = () => {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <TitleDiscription 
        title={content.title}
        description={content.description}
      />
      
      {/* Photobook / Gallery Section */}
      <div className='relative flex w-screen h-auto md:aspect-video md:max-h-screen py-4 items-center justify-center overflow-hidden'>
        <Videoscape 
          src="https://www.youtube.com/embed/INBzyeMpWzo?autoplay=1&mute=1&controls=0&loop=1&playlist=INBzyeMpWzo&modestbranding=1&showinfo=0&version=3&playlist=INBzyeMpWzo&rel=0"
          bg_value="bg-black"
        />
        {/* Placeholder for future artwork/gallery overlay */}
        <div className='text-container mix-blend-difference text-[--primary-white] opacity-100 z-10'>
           {/* Add text or interactive elements here if needed */}
        </div>
      </div>

      <div className='relative w-full'>
        <Seperator />
      </div>

      <CommentsSection pagePath="/home-photobook" mode="standalone" />

      <div className='relative w-full'>
        <Seperator />
      </div>

      <AcknowledgementSection names={["Digambar Sute", "Angarika Sute", "Family", "Friends"]} />
    </div>
  )
}

export default Home
