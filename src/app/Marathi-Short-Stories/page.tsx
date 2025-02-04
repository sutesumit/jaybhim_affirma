'use client';
import WritingsSnapscroll from "../my_components/image_bodies/writings_snapscroll";
import TitleDiscription from "../my_components/common/TitleDiscription";
import { flashFictions } from "../my_components/image_bodies/flash_fiction_object";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


const content = {
  title: "Imagining Images",
  description: {
    eng: "Few convoluted flash-fictions titled by abstract visuals, in a secret pursuit of articulating & visualizing disturbed relationships with the self and others.",
    mar: "काही अमूर्त चित्रांनी शीर्षकबद्ध करून संदर्भहिन स्पष्टीकरणात गुंडाळलेल्या फ्लॅश-फिक्शन कथा. स्वतःशी आणि इतरांशी असलेल्या अस्थिर नातेसंबंधांना शब्द आणि रूप देण्याच्या सुप्त हेतूने.",
  },
};

const background = (
  <div 
    className='h-full w-full p-1 flex flex-col items-center overflow-hidden hover:opacity-0'
  
  >
    {flashFictions.map((fiction, index) => (
      <motion.div 
        key={index}
        className='background-image-container opacity-30'
        animate={{ y: ["0%", "-1000%"], x: ["-0%", "0%"], scale: [1, 2, 1], rotate: [-90, 90] }}        
        transition={{ duration: 300, repeat: Infinity, repeatType: "reverse" }}
      >
          <Image
            src={fiction.imageUrl}
            alt={fiction.title}
            width={800}
            height={800}
            style={{ objectFit: 'cover' }}
          />
      </motion.div>
    ))}
  </div>
)


export default function Home() {

  const [isBgOn, setIsBgOn] = useState(true);
  
  return (
    <div className="min-h-screen">
      <div onMouseEnter={() => setIsBgOn(false)} onMouseLeave={() => setIsBgOn(true)}>
        <TitleDiscription
          title={content.title}
          description={content.description}
          background={isBgOn && background}
        />
      </div>
      <WritingsSnapscroll />
    </div> 

  )
}