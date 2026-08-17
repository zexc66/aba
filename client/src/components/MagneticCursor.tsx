import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MagneticCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const outerSpringX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 1 });
    const outerSpringY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 1 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[99999] overflow-hidden hidden lg:block">
            {/* Core Magnetic Ring */}
            <motion.div 
                className="w-10 h-10 rounded-full border border-[#5a1f2e]/60 fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                    x: springX,
                    y: springY,
                }}
            />
            {/* Ambient Interaction Layer */}
            <motion.div 
                className="w-4 h-4 rounded-full bg-[#5a1f2e] fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                style={{
                    x: outerSpringX,
                    y: outerSpringY,
                }}
            />
        </div>
    );
}
