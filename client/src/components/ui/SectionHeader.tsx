import { motion } from "framer-motion";

interface SectionHeaderProps {
    index: string;
    title: string;
    note?: string;
    meta?: string;
    dark?: boolean;
    id?: string;
    titleAs?: "h1" | "h2";
}

const MotionTitle = { h1: motion.h1, h2: motion.h2 } as const;

export default function SectionHeader({ index, title, note, meta, dark = false, id, titleAs = "h2" }: SectionHeaderProps) {
    const Title = MotionTitle[titleAs];
    const rule = dark ? "bg-white/15" : "bg-black/10";
    const idxColor = dark ? "text-[#f2a007]" : "text-[#5a1f2e]";
    const titleColor = dark ? "text-white" : "text-[#0b0b10]";
    const noteColor = dark ? "text-white/60" : "text-black/60";

    return (
        <div id={id} className="mb-14 scroll-mt-28">
            <div className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 md:gap-x-8">
                <motion.span
                    initial={false}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`t-meta t-data ${idxColor}`}
                    aria-hidden="true"
                >
                    {index}
                </motion.span>

                <div className="min-w-0">
                    <Title
                    initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${titleColor} leading-tight`}
                    >
                        {title}
                    </Title>
                    {note && (
                        <motion.p
                            initial={false}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.15 }}
                            className={`mt-4 max-w-[65ch] text-sm md:text-base leading-relaxed ${noteColor}`}
                        >
                            {note}
                        </motion.p>
                    )}
                </div>

                <div className="flex items-center gap-6 self-stretch">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-px w-16 lg:w-40 origin-left ${rule} hidden lg:block`}
                        aria-hidden="true"
                    />
                    {meta && (
                        <span className={`t-meta ${dark ? "text-white/50" : "text-black/50"} hidden md:block whitespace-nowrap`}>
                            {meta}
                        </span>
                    )}
                </div>
            </div>
            <div className={`mt-8 h-px w-full ${rule}`} aria-hidden="true" />
        </div>
    );
}
