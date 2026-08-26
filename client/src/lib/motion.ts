export const EASE_INSTITUTIONAL: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const EASE_PRESS: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const SPRING_DRAWER: { type: "spring"; duration: number; bounce: number } = {
    type: "spring",
    duration: 0.5,
    bounce: 0.2,
};

export const REVEAL = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, ease: EASE_INSTITUTIONAL },
} as const;
