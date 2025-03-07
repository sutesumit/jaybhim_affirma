'use client';
import WritingsSnapscroll from "../my_components/specific/image_bodies/writings_snapscroll";
import TitleDiscription from "../my_components/shared/TitleDiscription";
import { flashFictions } from "../my_components/specific/image_bodies/flash_fiction_object";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const content = {
  title: "Imagining Images",
  description: {
    eng: "Few convoluted flash-fictions titled by abstract visuals, in a secret pursuit of articulating & visualizing disturbed relationships with the self and others.",
    mar: "काही अमूर्त चित्रांनी शीर्षकबद्ध करून संदर्भहिन स्पष्टीकरणात गुंडाळलेल्या फ्लॅश-फिक्शन कथा. स्वतःशी आणि इतरांशी असलेल्या अस्थिर नातेसंबंधांना शब्द आणि रूप देण्याच्या सुप्त हेतूने.",
  },
};



const background = () => {
  return (
    <motion.div 
      className='h-full w-auto py-6 gap-6 inline-flex items-center overflow-hidden filter'
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
    >
      <div className="absolute inset-0 z-50 bg-[--primary-blue] opacity-20"></div>
      {[...flashFictions, ...flashFictions].map((fiction, index) => (
        <motion.div 
          key={index}
          className='background-image-container h-full aspect-square grayscale opacity-70'
          initial={{ scale: 3.1, rotate: 0 }}
          animate={{ scale: ["5.1", "3.1", "5.1"], rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
        
        >
            <Image
              src={fiction.imageUrl}
              alt={fiction.title}
              width={800}
              height={800}
              style={{ objectFit: "cover" }}
            />
        </motion.div>
      ))}
    </motion.div>
  )
}


export default function Home() {
  const [isBgOn, setIsBgOn] = useState(true);
  return (
    <div className="min-h-screen">
      <div onMouseEnter={() => setIsBgOn(true)} onMouseLeave={() => setIsBgOn(false)}>
        <TitleDiscription
          title={content.title}
          description={content.description}
          background={isBgOn && <>{background()}</>}
        />
      </div>
      <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-100 via-[--primary-white] to-blue-100'>
        <WritingsSnapscroll />
      </div>
    </div>
  )
}