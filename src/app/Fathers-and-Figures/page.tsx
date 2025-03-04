'use client'
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import TitleDiscription from '../my_components/shared/TitleDiscription';
import Seperator from '../my_components/specific/Seperator'
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from './background';


export default function Home() {

  const useMousePostion = ( ) => {
    
    const [mouseCords, setMouseCords] = React.useState({x: 0, y: 0})
    
    useEffect(()=> {
        const updateMouseCords = (event: MouseEvent): void => {
            if (event) {
                setMouseCords({ x: event.clientX, y: event.clientY });
            }
        }
        window.addEventListener('mousemove', updateMouseCords)
        return () => {
            window.removeEventListener('mousemove', updateMouseCords)
        }
    }, [])
    return mouseCords
  }

  const [isHovered, setIsHovered] = React.useState(false)

  const {x, y} = useMousePostion()

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
        className='playground relative flex flex-wrap gap-5 items-center justify-center h-[250vh] w-screen overflow-hidden'
        ref={playgroundRef}
      >
        {Array.from({ length: 23 }, (_, i) => i).map((i) => (
          <motion.div
            key={i+200}
            className=''
            drag
            dragConstraints={playgroundRef}
            style={{ ...imageStyle[i] }}
            dragElastic={0.1}
          >
            <Image
              src={`/fathersandfigures/${i + 1}.jpg`}
              alt={`Image ${i + 1}`}
              width={200}
              height={200}
              className="rounded-sm shadow-[1px_1px_5px_0px_var(--primary-blue)] pointer-events-none"
            />
          </motion.div>
        ))}
        <Seperator />
      </div>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">

          <div 
            className='reel-container absolute z-[-10] aspect-[9/16] rounded-lg overflow-clip pointer-events-none'
            style={{
              top: `${y}px`,
              left: `${x}px`,
            }}
          >
              { isHovered &&
                
                <iframe
                className='overflow-hidden pointer-events-none'
                src='https://www.youtube.com/embed/4yjNqLRRPxE?autoplay=1&mute=1&controls=0&loop=1&playlist=4yjNqLRRPxE&modestbranding=1&showinfo=0&version=3&rel=0&cc_load_policy=3&hl=en'
                title="Maraa Mirrors Reel"
                allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  border: 'none'
                }}
                ></iframe>

              }
              
          </div>

          <div 
            className="404-container flex flex-col items-center justify-center mx-2 p-10 rounded-lg font-rajdhani text-center overflow-clip bg-white/50 backdrop-blur-sm border-[1px] border-[var(--primary-blue)] hover:scale-90 hover:shadow-[8px_8px_0px_0px_var(--primary-blue)] transition-transition duration-300 ease-in-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className='loader mb-5'></div>
            <div className="space-y-6">
              <div className="text-container !text-center">
                Arre! This page is under construction.
              </div>
              <div className="text-container !text-xs !text-center !leading-relaxed">
                But worry not, sumit is rolling up his sleeves,
                chasing down time and resources, and will bring this <span className='opacity-50'>Fathers and Figures</span> page to life soon.<br />Hang tight!
              </div>
            
              <div className='text-container flex justify-center gap-2 font-title bg-blend-difference transition-colors duration-1000 ease-out'>
                <Link
                  href="https://youtu.be/llARFMPOTB0?t=1119"
                  target="_blank"
                  className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
                >
                  Watch the old walkthrough video here.
                </Link>
                <Link
                  href="https://sumitupall.tumblr.com/"
                  target="_blank"
                  className="flex justify-center items-center flex-1 px-4 py-2 text-center rounded-sm border-[1px] border-[var(--primary-blue)] text-xs hover:bg-[var(--primary-blue)] hover:text-[var(--primary-white)]"
                >
                  Check out the work on the old site.
                </Link>
              </div>
            </div>

          
          </div>
        
      </div>
    </>
  );
}