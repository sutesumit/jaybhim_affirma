"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMenuContext } from "../Header/menuContext/useMenuContext";
import { AnimatePresence } from "framer-motion";
import { TitleDiscription } from "../PageTitleSection";

const DURATION = 0.2;
const STAGGER = 0.05;

export default function JaiBhim() {
    const { isMenuOpen, setMenuOpen } = useMenuContext();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleOpenMenu = () => {
        setMenuOpen(true);
        setIsDialogOpen(false);
    };

    return (
        <div className="relative">
            <div className="relative group cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                <motion.div
                    className="relative flex items-center justify-center "
                    initial="initial"
                    whileHover="hovered"
                >
                    {/* Bottom Ashok Chakra - slides in */}
                    <motion.div
                        className="absolute m-auto inset-0 flex items-center justify-center -z-10 pointer-events-none"
                        variants={{
                            initial: { opacity: 0, scale: 0.5 },
                            hovered: { opacity: 1, scale: 1 }
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src="/ashoka-chakra.svg"
                            alt="Ashok Chakra"
                            width={80}
                            height={80}
                            className="animate-spin [animation-duration:10s]"
                        />
                    </motion.div>
                    <div 
                        className="overflow-hidden relative px-6 font-rajdhani button-style text-[1rem] flex items-center justify-center whitespace-nowrap uppercase"
                        style={{ lineHeight: 1.1 }}
                    >
                        {/* Top Text layer - slides out */}
                        <motion.div
                            className="flex items-center justify-center z-0"
                            variants={{
                                initial: { y: 0 },
                                hovered: { y: "-100%" },
                            }}
                        >
                            {"Begin".split("").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className="inline-block"
                                    variants={{
                                        initial: { y: 0 },
                                        hovered: { y: "-100%" },
                                    }}
                                    transition={{
                                        duration: DURATION,
                                        ease: "easeInOut",
                                        delay: STAGGER * index,
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Bottom layer - slides in */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-10"
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                                }}
                            >
                                {["ज", "य", " ", "भी", "म"].map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        className="inline-block"
                                        variants={{
                                            initial: { y: "100%" },
                                            hovered: { y: 0 },
                                        }}
                                        transition={{
                                            duration: DURATION,
                                            ease: "easeInOut",
                                            delay: STAGGER * index,
                                        }}
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

            <AnimatePresence>
                {isDialogOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) handleOpenMenu();
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-[500px] min-h-[60vh] relative pointer-events-auto font-light"
                        >
                            <TitleDiscription 
                                variant="popup-bio" 
                                title="Artist's Bio" 
                                onClose={() => handleOpenMenu()}
                                description={{
                                    eng: "Sumit Sute is a visual artist who grew up in Aurangabad, Maharashtra. Through his works, he curiously attempts to converge the personal and the political to make sense of the influences of casteist-patriarchal traumas on emotional inheritance and familial bondings. While he continues to grapple to locate himself as a neo-middleclass urban dalit with survior's guilt; the artistic, economic and communal isolations have often informed his anxieties resulting into his lower artistic endurance. Through his artistic practice, he intends to develop a visual vocabulary to acknowledge, struggle and heal through the shame, anger and anxieties of his emotional responses around caste-patriarchy-class influenced intergenerational traumas. ",
                                    mar: "मूळचा औरंगाबादचा सुमित सुटे हा एक छायाकलाकार आहे. समाजातल्या जातीय आणि पुरुषकेंद्री व्यवस्थांची कौटुंबिक नात्यांवर होणाऱ्या पिढीजात आणि खोलवर पडसादांचा कानोसा घेत तो त्याच्या छायाकृतींतून वैयक्तिक आणि राजकीय नीतींचा मेळ लावू पाहतो. स्वतःची नव-मध्यमवर्गीय शहरी दलित म्हणून ओळख स्विकारताना त्याबरोबर आपसूक येणाऱ्या चांगल्या नशिबाची अपराधी जाण ठेवत जेव्हा जेव्हा तो कलात्मक, आर्थिक आणि सामाजिक एकटेपणात स्वतःला सापडतो, तेव्हा तेव्हा त्याची कलात्मक चिकाटी फाटून असते. जातीय-पुरुषकेंद्री-वर्गीय व्यवस्थेतून घडलेल्या पिढीजात आघातांच्या भावनिक प्रतिसादाला, राग-लाज आणि अस्वस्थतेला ओळखायला, झगडायला आणि ऊभरून यायला तो स्वतःची दृकभाषा विकसित करू पाहतोय."
                                }} 
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
