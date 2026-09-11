import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { memo } from "react";

interface FaqProps {
    data: {
        title: string;
        eyebrow: string;
        note: string;
        items: { q: string; a: string }[];
    };
}

function FaqComponent({ data }: FaqProps) {
    return (
        <Section id="faq" className="relative py-20 bg-white border-b border-[#0b0b10]/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                <SectionHeader index="08.1" title={data.title} note={data.note} />

                <dl className="mt-14 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
                    {data.items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                            className="grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-3 md:gap-8 py-8"
                        >
                            <span className="t-meta text-[#5a1f2e] pt-1" aria-hidden="true">
                                {`FAQ_${String(i + 1).padStart(2, "0")}`}
                            </span>
                            <div>
                                <dt>
                                    <h3 className="text-lg font-semibold text-[#0b0b10] leading-snug">
                                        {item.q}
                                    </h3>
                                </dt>
                                <dd className="mt-2.5 max-w-[75ch] text-sm md:text-base text-[#0b0b10]/70 leading-relaxed">
                                    {item.a}
                                </dd>
                            </div>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </Section>
    );
}

const Faq = memo(FaqComponent);
export default Faq;
