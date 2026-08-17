import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    duration = 2,
    className = ""
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    const displayValue = useTransform(springValue, (latest) => {
        return Math.floor(latest);
    });

    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value);
            setHasAnimated(true);
        }
    }, [isInView, value, springValue, hasAnimated]);

    useEffect(() => {
        const unsubscribe = displayValue.on("change", (latest) => {
            setDisplay(latest);
        });
        return unsubscribe;
    }, [displayValue]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            {prefix}{display.toLocaleString()}{suffix}
        </motion.span>
    );
}
