"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TitleDiscription } from "../PageTitleSection";
import { randomInRange } from "@/_hooks/useRandomRotation";

interface ArtistBioPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const bioContent = {
    eng: "Sumit Sute is a visual artist who grew up in Aurangabad, Maharashtra. Through his works, he curiously attempts to converge the personal and the political to make sense of the influences of casteist-patriarchal traumas on emotional inheritance and familial bondings. While he continues to grapple to locate himself as a neo-middleclass urban dalit with survior's guilt; the artistic, economic and communal isolations have often informed his anxieties resulting into his lower artistic endurance. Through his artistic practice, he intends to develop a visual vocabulary to acknowledge, struggle and heal through the shame, anger and anxieties of his emotional responses around caste-patriarchy-class influenced intergenerational traumas. ",
    mar: "मूळचा औरंगाबादचा सुमित सुटे हा एक छायाकलाकार आहे. समाजातल्या जातीय आणि पुरुषकेंद्री व्यवस्थांची कौटुंबिक नात्यांवर होणाऱ्या पिढीजात आणि खोलवर पडसादांचा कानोसा घेत तो त्याच्या छायाकृतींतून वैयक्तिक आणि राजकीय नीतींचा मेळ लावू पाहतो. स्वतःची नव-मध्यमवर्गीय शहरी दलित म्हणून ओळख स्विकारताना त्याबरोबर आपसूक येणाऱ्या चांगल्या नशिबाची अपराधी जाण ठेवत जेव्हा जेव्हा तो कलात्मक, आर्थिक आणि सामाजिक एकटेपणात स्वतःला सापडतो, तेव्हा तेव्हा त्याची कलात्मक चिकाटी फाटून असते. जातीय-पुरुषकेंद्री-वर्गीय व्यवस्थेतून घडलेल्या पिढीजात आघातांच्या भावनिक प्रतिसादाला, राग-लाज आणि अस्वस्थतेला ओळखायला, झगडायला आणि ऊभरून यायला तो स्वतःची दृकभाषा विकसित करू पाहतोय."
};

const ArtistBioPopup: React.FC<ArtistBioPopupProps> = ({ isOpen, onClose }) => {
    const initialRotation = randomInRange(-5, 5);
    const exitRotation = randomInRange(-90, 90);
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div 
                        initial={{ 
                            opacity: 0, 
                            y: -80, 
                            scale: 0.95, 
                            rotate: initialRotation 
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            transition: { type: "spring", stiffness: 250, damping: 20 }
                        }}
                        exit={{
                            opacity: 0,
                            y: 550,
                            scale: 0.5,
                            rotate: exitRotation,
                            transition: { duration: 0.4, ease: "easeIn" }
                        }}
                        className="w-full max-w-[500px] min-h-[60vh] relative pointer-events-auto font-light"
                    >
                        <TitleDiscription 
                            variant="popup-bio" 
                            title="Artist's Bio" 
                            onClose={onClose}
                            description={bioContent} 
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ArtistBioPopup;
