import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello! How can I help you today?",
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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response || "I'm sorry, I couldn't process that.",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting. Please try again later.",
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
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center bg-[#5a1f2e] hover:bg-[#0b0b10] text-white border border-black/20 transition-colors no-press"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle chat"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="h-6 w-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="h-6 w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                        aria-label="AIABASD Assistant"
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "bottom right" }}
                        className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] flex flex-col border border-black/15 bg-white"
                    >
                        <div className="flex items-center justify-between border-b border-black/10 bg-[#5a1f2e] px-4 py-3">
                            <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400" aria-hidden="true" />
                                <h3 className="t-meta text-white">AIABASD Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-sm p-1 text-white/80 hover:bg-white/20 transition"
                                aria-label="Close chat"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-sm px-4 py-2 ${message.sender === "user"
                                                ? "bg-[#5a1f2e] text-white"
                                                : "bg-black/5 text-black"
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p
                                            className={`mt-1 t-meta ${message.sender === "user" ? "text-white/60" : "text-black/45"
                                                }`}
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="max-w-[80%] rounded-sm bg-black/5 px-4 py-2">
                                        <div className="flex items-center gap-1">
                                            <div className="h-2 w-2 rounded-full bg-black/30 animate-bounce motion-reduce:animate-none" style={{ animationDelay: "0ms" }} />
                                            <div className="h-2 w-2 rounded-full bg-black/30 animate-bounce motion-reduce:animate-none" style={{ animationDelay: "150ms" }} />
                                            <div className="h-2 w-2 rounded-full bg-black/30 animate-bounce motion-reduce:animate-none" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-black/10 p-4">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    aria-label="Message"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 rounded-sm border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#5a1f2e] transition-colors"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="rounded-sm bg-[#5a1f2e] px-4 py-2.5 text-white hover:bg-[#0b0b10] transition-colors disabled:opacity-50 disabled:cursor-not-allowed no-press"
                                    aria-label="Send message"
                                >
                                    {isTyping ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Send className="h-5 w-5" />
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
