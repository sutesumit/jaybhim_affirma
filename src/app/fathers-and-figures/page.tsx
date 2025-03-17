'use client'
import React, { useEffect, useState, useRef } from 'react';
import TitleDiscription from '../my_components/shared/TitleDiscription';
import Seperator from '../my_components/shared/Seperator'
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from './background';
import Link from 'next/link';
import SubmitCards from './SubmitCards';


export default function Home() {
  const content = {
    title: "Fathers and Figures",
    description: {
      eng: "Intergenerational caste-patriarchal trauma hollows the very substance from our relationship with our fathers, generations after generations. The collective emotional hijacking of our fathers by the caste-patriarchal forces have badly crippled our emotional development in turn. The deliberate dumbing and numbing of the self, as a response to either obey or tolerate these casteist and patriarchal structures is our own inherited unhealed trauma too. Across the social spectrum, extra-familial patriarchal personalities as father figures occupy the vacuum left by emotionally absent men within our families who were already kidnapped away or baptized by caste-patriarchal systems for its own agenda.\n\nStrong savior icons with political and spiritual persona, figuratively come to occupy this vacant/inactive position of a father figure and ultimately to rescue his followers. There is often a risk that these father figures would reinforce similar paternal and hero-worshipping hierarchical norms. On the other hand, Dr Ambedkar, as an ideal father figure, with incredible grace and compassion in his imagery, has been easily accessible to his follower through his ideals. Yet, the complete lack of substance in my relationship with my own father continues to tremble me. As I am approaching my father's age when he had become a father himself, I realize that I have been growing into a similar emotional space as he already had. I am reciprocating the inactivity in the bond and contributing to it's hollowness in similar ways.\n\nThe father-son/daughter crisis is our collective wound and still there is so much scope for individual nuance as well. I invite you to move the photo-pieces in my story and see if it turns into yours.",
      mar: "पिढ्यान पिढ्या बापलेक/बापलेकीच्या नात्यांतला गाभाच पिढीजात जातीय-पुरुषकेंद्री आघात पोखरत राहिले आहेत. आपल्या बापमंडळींचं जातीय-पुरुषधार्जिण्या संस्कृतीने केलेलं सामूहिक अपहरण अथवा पदहरण हे आपल्या भावनिक विकासाच्या अपूर्णतेची कारणमिमांसा आहे. मुद्दामहून मंद आणि संथ करवलेली आपली मने, आणि काही वेळी कट्टरतेने पुरस्कार, असे प्रतिसाद खरे तर अश्या जातीय-पुरुषी व्यवस्थेच्या एकतर अंकुशांत किंवा सहनशीलतेतून घडलेली पिढीजात भावनिक व्रणांचीच देण आहे. समाजातल्या कुठल्याही स्तरात असो, जातीय-पुरुषकेंद्री व्यवस्थेने स्वतःच्याच मशागतीसाठी पळवलेल्या किंवा वळवलेल्या, आणि त्यामुळे भावनिक दृष्ट्या घरातून बुट्टी असलेल्या माणसांच्या रिकाम्या जागांवर मग बड्या पुरुषी व्यक्तिमत्त्वांनी पिता-समान स्थान निर्माण केलेले असते.\n\nअशा वेळी राजकीय आणि अध्यात्मिक मार्गदाते लाक्षणिकरित्या हि वडील व्यक्तीची रिकामी/अव्यक्त जागा भरून काढतात आणि त्यांच्या अनुयायांना आधार देतात. परंतु बहुतेकदा हेच बडे पितासमान मंडळी त्याच पुरुषी आणि व्यक्तिपूजेच्या उतरंडीत स्वतःला रुजवतात. अश्या बड्या आणि जोखमीच्या बाप्यांच्या गर्दीत, बाबासाहेब एक काळजीवाहू आणि आदर्श पिताकृती म्हणून आपल्या विचारांच्या आणि आदर्शाच्या माध्यमातून सामान्य आंबेडकरवाद्याला सहज भेटण्याजोगे आहेत. तरीही, जवळपास सगळंच पोकळ असलेलं माझ्या वडिलांशी असलेलं माझं नातं अजूनही अंगावर शहारे आणतं. माझ्या जन्माच्या वेळी माझे वडील होते त्या वयाचं होत असताना आता लक्षात येतंय कि मी देखील भावनिकरीत्या त्याच छापाचा होत आहे. आमच्या दोघांमधल्या नात्यातल्या पोकळपणाला आणि थंडपणाला माझादेखील तेवढाच हातभार आहे, मीदेखील तितकाच जबाबदार आहे.\n\nबापलेक/बापलेकीच्या नात्यावरच हे ग्रहण हे बहुतेक आपल्या सगळ्यांचीच सामाईक जखम असूनही आपल्या प्रत्येकाच्या घरातली कहाणी थोडी-थोडी वेगळी असेल. मी वरवर सांगू पाहत असलेली हि माझी चित्रकथा, ज्याचे हिस्से खालीवर ड्रॅग करून कदाचित तुम्हाला तुमचीही कथा सापडेल ह्या अपेक्षेने इथे मांडतोय.",
    },
  }
  
  const playgroundRef = useRef<HTMLDivElement | null>(null)

  type imageSizeProp = {
    scale: number
    rotate: number
    cursor: string
  }

  const [imageStyle, setImageStyle] = useState<imageSizeProp[]>([])

  useEffect(() => {
    setImageStyle(Array.from({ length: 23 }, (_, i) => ({
      scale: Math.random() * .6 + .8,
      rotate: Math.random() * 60 - 30,
      cursor: 'grab'
    })));
  }, []);

  return (
    <>

      <TitleDiscription
        title={content.title}
        description={content.description}
        background={<Background />}
      />

      
      <div 
        className='playground relative flex flex-wrap gap-5 items-center justify-center p-[5vh] min-h-screen w-screen bg-gradient-to-tl from-blue-300 to-blue-50 rounded-lg overflow-hidden'
        ref={playgroundRef}
      >
        <div 
          className="instruction absolute lowercase bg-blend-multiply top-[40%] -rotate-2 text-container m-2 !p-14 !text-xl !text-center border-dotted border-[1px] border-[var(--primary-blue)] rounded-sm"
        >
          📝🖼️ Craft a story by arranging these frames and watch as your thoughts weave into a father-son tale! 👨🏽‍👦🏽📑
        </div>
        {Array.from({ length: 23 }, (_, i) => i).map((i) => (
          <motion.div
            key={i+200}
            className=''
            drag
            dragConstraints={playgroundRef}
            style={{ ...imageStyle[i] }}
            dragElastic={0.1}
            whileDrag={{ boxShadow: '0px 0px 10px 0px var(--primary-blue)', rotate: 0, scale: 1.1 }}
          >
            <Image
              src={`/fathersandfigures/${i + 1}.jpg`}
              alt={`Image ${i + 1}`}
              width={200}
              height={200}
              className="rounded-sm shadow-[1px_1px_1px_0px_var(--primary-blue)] pointer-events-none"
            />
          </motion.div>
        ))}
        <Seperator />
      </div>

      <div className="relative isolate text-container grid md:grid-cols-2 my-2 md:flex-row flex-col items-center justify-center gap-5">
        <div className="flex-1 w-full max-h-[75vh] aspect-[7/12] border-[1px] border-[var(--primary-blue)] rounded-sm overflow-hidden">
          <iframe
            className='rounded-sm inline h-full overflow-hidden'
            src='https://www.youtube.com/embed/4yjNqLRRPxE?&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&hl=en'
            title="Maraa Mirrors Reel"
            allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              
            }}
            >
            </iframe>
        </div>
        <div className='storyboard flex-1 flex flex-col gap-2 h-[80vh] md:h-full w-full'>
        <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Screeshot the story!</button>  
          <textarea defaultValue={'Describe your story here!'} className='text-center text-sm flex-1 p-5 w-full border-[1px] border-[var(--primary-blue)] rounded-sm' readOnly></textarea>
          <textarea defaultValue={'Your name (Optional)'} className='text-center text-sm p-1 w-full border-[1px] border-[var(--primary-blue)] rounded-sm' readOnly></textarea>
          <button onClick={()=> alert('sumit is still cooking this feature—almost there!')} className='border-[1px] text-xs rounded-sm border-[var(--primary-blue)] p-1 hover:scale-90 hover:shadow-[4px_4px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out'>Send me your story!</button>  
        </div>      
      </div>

      <div className="relative">
        <Seperator />
      </div>

      <SubmitCards />

      <div className="relative">
        <Seperator />
      </div>

      <div className='relative isolate p-5 flex flex-col items-center justify-center'>
        <div className="text-container my-2 p-1 border-[1px] border-[var(--primary-blue)] hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)] rounded-sm transition-all duration-300 ease-in-out">
            <div className='text-xs opacity-80 text-center'>This project was nurtured with the support of <Link target='_blank' href="https://maraa.in/portfolio/mirrors-fellowship/" className="link-text">Maraa&apos;s Mirrors</Link> (2024) — A Creative Fellowship on Masculinity.</div>
        </div>
        <div className="relative isolate text-container flex flex-1 md:flex-row flex-col items-center justify-center gap-4">
          <Image
            src='/fathersandfigures/maraa_exhibition/1.jpg'
            alt='A visitor during the exhibition'
            width={220}
            height={200}
            className="rounded-sm overflow-hidden"
          />
          <Image
            src='/fathersandfigures/maraa_exhibition/2.jpg'
            alt='A visitor during the exhibition'
            style={{ transform: 'scaleX(-1)' }}
            width={220}
            height={200}
            className="rounded-sm overflow-hidden"
          />
        </div>
        <div className='text-container !text-xs !text-center p-1'>Scenes from the <Link className='link-text' target='_blank' href="https://bangaloreinternationalcentre.org/event/mirrors/">Mirrors Group Show</Link> on Experiences & Expressions of Masculine & Feminine at Bangalore International Center, November 2024. <span className="opacity-50">Image courtesy of <span className="italic">Angarika</span> from the Maraa team.</span></div>
        
        <div className="maraa-video border-[1px] border-dotted rounded-sm border-[var(--primary-blue)] mt-5 p-1 w-full aspect-[16/10] text-container flex flex-col items-center justify-center">
            <iframe
              className='rounded-sm w-full mx-auto object-cover'
              style={{ width: '100%',
                      height: '100%',
                    }}
              src="https://www.youtube.com/embed/Zfsro2hMTws?si=4Ux5lmDwZLW9z7Pf&amp;start=128&end=180&loop=1&modestbranding=1&rel=0&hl=en"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            >
            </iframe>
            <div className='text-container !text-xs !text-center p-1 italic'>A glimpse into the making & unmaking of Mirrors 2024.</div>
        </div>
      </div>
    </>
  );
}