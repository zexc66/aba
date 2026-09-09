import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { LOCALIZED_COPY } from "@/localizedCopy";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export default function Chatbot() {
    const { lang, isRTL } = useLanguageContext();
    const shouldReduceMotion = useReducedMotion();
    const copy = LOCALIZED_COPY[lang].chatbot;
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: copy.initialGreeting,
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => inputRef.current?.focus());
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages((previous) => previous.length === 1 && previous[0].id === "1"
            ? [{ ...previous[0], text: copy.initialGreeting }]
            : previous);
    }, [copy.initialGreeting]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, locale: lang }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response || copy.fallback,
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: copy.connectionError,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 end-6 z-[60] flex h-14 w-14 items-center justify-center border border-[#0b0b10]/20 bg-[#5a1f2e] text-[#fdfcfb] shadow-[0_18px_45px_rgba(90,31,46,0.24)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-[#0b0b10] hover:shadow-[0_20px_55px_rgba(11,11,16,0.22)] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] motion-reduce:transition-none no-press"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                 aria-label={copy.toggleChat}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        >
                            <X className="h-6 w-6" strokeWidth={1.75} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        >
                            <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                         aria-label={copy.assistantLabel}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.97 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: isRTL ? "bottom left" : "bottom right" }}
                        className="fixed bottom-24 end-6 z-[60] flex h-[500px] w-96 max-w-[calc(100vw-3rem)] flex-col border border-[#0b0b10]/15 bg-[#fdfcfb] shadow-[0_24px_70px_rgba(90,31,46,0.20)]"
                    >
                        <div className="flex items-center justify-between gap-3 border-b border-[#fdfcfb]/15 bg-[#5a1f2e] px-4 py-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400" aria-hidden="true" />
                                 <h3 className="t-meta min-w-0 break-words text-[#fdfcfb]">{copy.assistantLabel}</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="shrink-0 p-1 text-[#fdfcfb]/80 transition-[background-color,color,transform] duration-200 hover:bg-[#fdfcfb]/15 hover:text-[#fdfcfb] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] motion-reduce:transition-none"
                                 aria-label={copy.closeChat}
                            >
                                <X className="h-5 w-5" strokeWidth={1.75} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite" aria-busy={isTyping}>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] min-w-0 px-4 py-2 ${message.sender === "user"
                                                ? "bg-[#5a1f2e] text-[#fdfcfb]"
                                                : "bg-[#0b0b10]/5 text-[#0b0b10]"
                                            }`}
                                    >
                                        <p className="break-words text-sm leading-relaxed text-pretty">{message.text}</p>
                                        <p
                                            className={`mt-1 t-meta tabular-nums ${message.sender === "user" ? "text-[#fdfcfb]/60" : "text-[#0b0b10]/45"
                                                }`}
                                            dir="ltr"
                                        >
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                                    className="flex justify-start"
                                >
                                    <div className="max-w-[80%] bg-[#0b0b10]/5 px-4 py-2">
                                        <div className="flex items-center gap-1">
                                            <div className="h-2 w-2 rounded-full bg-[#5a1f2e]/45 animate-pulse motion-reduce:animate-none" style={{ animationDelay: "0ms" }} />
                                            <div className="h-2 w-2 rounded-full bg-[#5a1f2e]/45 animate-pulse motion-reduce:animate-none" style={{ animationDelay: "150ms" }} />
                                            <div className="h-2 w-2 rounded-full bg-[#5a1f2e]/45 animate-pulse motion-reduce:animate-none" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-[#0b0b10]/10 p-4">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                     aria-label={copy.messageLabel}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                     placeholder={copy.messagePlaceholder}
                                    className="min-w-0 flex-1 border border-[#0b0b10]/15 bg-[#fdfcfb] px-4 py-2.5 text-sm text-[#0b0b10] outline-none transition-colors duration-200 placeholder:text-[#0b0b10]/35 focus:border-[#5a1f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e] disabled:cursor-not-allowed disabled:bg-[#0b0b10]/5 motion-reduce:transition-none"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="bg-[#5a1f2e] px-4 py-2.5 text-[#fdfcfb] transition-[background-color,transform,opacity] duration-200 hover:bg-[#0b0b10] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none no-press"
                                     aria-label={copy.sendMessage}
                                >
                                    {isTyping ? (
                                        <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" strokeWidth={1.75} />
                                    ) : (
                                        <Send className="h-5 w-5 rtl:-scale-x-100" strokeWidth={1.75} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
