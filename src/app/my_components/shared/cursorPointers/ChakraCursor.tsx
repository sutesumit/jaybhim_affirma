"use client";
import React, { useEffect, useState } from 'react';
import useMousePosition from '@/_hooks/useMousePosition';
import Image from 'next/image';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const ChakraCursor = () => {
    const { x, y } = useMousePosition();
    const [isVisible, setIsVisible] = useState(false);

    // Motion values for smooth tracking
    const mouseX = useMotionValue(x);
    const mouseY = useMotionValue(y);

    // Update motion values when mouse position changes
    useEffect(() => {
        if (x !== 0 || y !== 0) {
            if (!isVisible) {
                // If it's the first time we get valid coordinates, jump there immediately
                mouseX.set(x);
                mouseY.set(y);
                setIsVisible(true);
            } else {
                mouseX.set(x);
                mouseY.set(y);
            }
        }
    }, [x, y, mouseX, mouseY, isVisible]);

    // Spring configuration for elastically "draggy" feel
    // stiffness: frequency of oscillation
    // damping: opposition to oscillation
    // mass: weight of the object
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Velocity-based scaling
    const velX = useVelocity(springX);
    const velY = useVelocity(springY);
    
    // Calculate total velocity (speed)
    const velocity = useTransform([velX, velY], ([vX, vY]) => {
        return Math.sqrt(Math.pow(Number(vX), 2) + Math.pow(Number(vY), 2));
    });

    /**
     * ELASTIC SCALE CONFIGURATION
     * 
     * 1. velocityRange [min, max]: Defines the speed thresholds (px/s).
     *    - If max is low (e.g. 500), the cursor reacts to slow movements.
     *    - If max is high (e.g. 1000), it only reacts to very fast sweeps.
     * 
     * 2. scaleRange [start, end]: Defines the visual size change.
     *    - [1, 0] makes the cursor vanish at high speed.
     *    - [1, 1.5] would make the cursor "swell" or grow when moved.
     */
    const velocityRange = [0, 1000]; 
    const scaleRange = [1, 0];

    const rawScale = useTransform(velocity, velocityRange, scaleRange);

    // Add spring physics to the scale so the size change feels organic and "meaty"
    const springScale = useSpring(rawScale, { 
        stiffness: 300, // Resistance to change (Higher = Snappier)
        damping: 30,    // Friction (Higher = Less "wobble" after stopping)
    });

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            style={{
                left: springX,
                top: springY,
                x: "-50%",
                y: "-50%",
                scale: springScale,
                width: '30px',
                height: '30px',
            }}
        >
            <Image
                src="/ashoka-chakra.svg"
                alt="Ashok Chakra Cursor"
                width={30}
                height={30}
                className="animate-spin [animation-duration:5s]"
                style={{ filter: 'brightness(0) invert(1)' }}
            />
        </motion.div>
    );
};

export default ChakraCursor;
