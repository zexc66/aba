import { useState, useEffect, useRef, memo } from "react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { type Content } from "@/data";

interface TestimonialsProps {
    data: Content['testimonials'];
    hud: Content['hud'];
    lang: string;
}

function TestimonialsComponent({ data, hud }: TestimonialsProps) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [pausedByUser, setPausedByUser] = useState(false);
    const resumeTimer = useRef<number | null>(null);

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % data.list.length);
        }, 9000);
        return () => clearInterval(timer);
    }, [autoPlay, data.list.length]);

    useEffect(() => () => {
        window.clearTimeout(resumeTimer.current ?? undefined);
    }, []);

    const pauseAndResume = () => {
        if (pausedByUser) return;
        setAutoPlay(false);
        window.clearTimeout(resumeTimer.current ?? undefined);
        resumeTimer.current = window.setTimeout(() => setAutoPlay(true), 14000);
    };

    const toggleUserPause = () => {
        const next = !pausedByUser;
        setPausedByUser(next);
        if (next) {
            window.clearTimeout(resumeTimer.current ?? undefined);
            setAutoPlay(false);
        }
    };

    const next = () => {
        pauseAndResume();
        setCurrent((prev) => (prev + 1) % data.list.length);
    };

    const prev = () => {
        pauseAndResume();
        setCurrent((prev) => (prev - 1 + data.list.length) % data.list.length);
    };

    const t = data.list[current];

    return (
        <Section id="testimonials" className="relative py-16 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="07"
                    title={`${data.title.main} ${data.title.highlighted} ${data.title.partner}`}
                    note={data.subtitle}
                    meta={hud.voice}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

                    <div className="lg:col-span-9">
                        <div className="border border-black/10 bg-white relative">
                            <div className="t-meta text-[#5a1f2e] flex items-center justify-between px-6 md:px-10 py-4 border-b border-black/10">
                                <span>{data.sectionRef}</span>
                                <span className="t-data text-xs text-black/45" aria-hidden="true" dir="ltr">{t.id}</span>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={current}
                                    initial={false}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="px-6 md:px-10 py-8 md:py-10 space-y-8 relative"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-2 md:top-4 start-4 md:start-6 t-data text-6xl md:text-7xl text-[#5a1f2e]/15 leading-none select-none"
                                    >
                                        &ldquo;
                                    </span>

                                    <p className="text-2xl md:text-3xl font-medium text-[#0b0b10] leading-snug tracking-tight relative">
                                        {t.quote}
                                    </p>

                                    <footer className="flex items-center gap-4 pt-6 border-t border-black/10 relative">
                                        {/[\u0600-\u06FF]/.test(t.author) ? (
                                            <span className="w-10 h-10 bg-[#5a1f2e] text-[#f2a007] flex items-center justify-center shrink-0" aria-hidden="true">
                                                <Quote size={16} strokeWidth={1.5} />
                                            </span>
                                        ) : (
                                            <span className="w-10 h-10 bg-[#5a1f2e] text-[#f2a007] flex items-center justify-center t-data text-xs shrink-0" aria-hidden="true">
                                                {t.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                                            </span>
                                        )}
                                        <div>
                                            <h3 className="text-base font-bold text-[#0b0b10]">
                                                {t.author}
                                            </h3>
                                            <p className="t-meta text-black/50 mt-1">
                                                {t.position}
                                            </p>
                                        </div>
                                    </footer>
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between gap-6">
                        <span className="t-data text-sm text-black/45" aria-live="polite" dir="ltr">
                            {`${(current + 1).toString().padStart(2, "0")} / ${data.list.length.toString().padStart(2, "0")}`}
                        </span>

                        <button
                            onClick={toggleUserPause}
                            aria-pressed={pausedByUser}
                            aria-label={pausedByUser ? data.controls.resume : data.controls.pause}
                            className="w-12 h-12 border border-black/15 flex items-center justify-center text-black/70 hover:bg-[#5a1f2e] hover:text-white hover:border-[#5a1f2e] transition-colors"
                        >
                            {pausedByUser ? <Play className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} /> : <Pause strokeWidth={1.5} className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={prev}
                                aria-label={data.controls.prev}
                                className="w-12 h-12 border border-black/15 flex items-center justify-center text-black/70 hover:bg-[#5a1f2e] hover:text-white hover:border-[#5a1f2e] transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={next}
                                aria-label={data.controls.next}
                                className="w-12 h-12 border border-black/15 flex items-center justify-center text-black/70 hover:bg-[#5a1f2e] hover:text-white hover:border-[#5a1f2e] transition-colors"
                            >
                                <ArrowRight className="w-5 h-5 rtl:rotate-180" strokeWidth={1.5} />
                            </button>
                        </div>

                        <div
                            className="hidden lg:flex flex-col gap-2.5 items-end"
                            role="group"
                            aria-label={data.controls.pagination}
                        >
                            {data.list.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrent(i);
                                        pauseAndResume();
                                    }}
                                    aria-label={`${i + 1}`}
                                    aria-current={i === current}
                                    className="py-2.5"
                                >
                                    <span className={`block h-1 transition-[color,background-color,border-color,transform] duration-300 ${i === current ? "w-10 bg-[#5a1f2e]" : "w-5 bg-black/20 hover:bg-black/40"}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
}

const Testimonials = memo(TestimonialsComponent);
export default Testimonials;
