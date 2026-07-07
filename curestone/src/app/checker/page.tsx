"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";

type Message = {
  role: "bot" | "user";
  content: string;
  timestamp: Date;
};

const ONBOARDING = {
  en: {
    name: "Welcome to **Cure Stone Hospital**. To better assist you with our surgical and consultation services, may I know your name?",
    greeting: (name: string) => `Nice to meet you, **${name}**! 😊\n\nHow can I help you today?\n\nFeel free to ask me anything about kidney stones, RIRS surgery, treatments, or symptoms! 👇`,
    phone: "To ensure your inquiry is prioritized by **Dr. Deepanshu Gupta**'s surgical team, please share your contact number. This allows us to coordinate your hospital visit efficiently.",
  },
  hi: {
    name: "**Cure Stone Hospital** में आपका स्वागत है। हमारी सर्जिकल और परामर्श सेवाओं को बेहतर ढंग से प्रदान करने के लिए, क्या मैं आपका नाम जान सकता हूँ?",
    greeting: (name: string) => `आपसे मिलकर खुशी हुई, **${name}**! 😊\n\nमैं आज आपकी कैसे मदद कर सकता हूँ?\n\nकिडनी स्टोन, RIRS सर्जरी, उपचार या लक्षणों के बारे में कुछ भी पूछें! 👇`,
    phone: "**डॉ. दीपांशु गुप्ता** की सर्जिकल टीम द्वारा आपकी पूछताछ को प्राथमिकता दी जाए, यह सुनिश्चित करने के लिए कृपया अपना संपर्क नंबर साझा करें। इससे हमें आपके अस्पताल के दौरे का कुशलतापूर्वक समन्वय करने में मदद मिलेगी।",
  },
};

const QUICK_PROMPTS = {
  en: [
    { label: "Stone Types", prompt: "What are the different types of kidney stones?" },
    { label: "Symptoms", prompt: "What are the common symptoms of kidney stones?" },
    { label: "Prevention", prompt: "How can I prevent kidney stones?" },
    { label: "RIRS Surgery", prompt: "What is RIRS laser surgery?" },
  ],
  hi: [
    { label: "पथरी के प्रकार", prompt: "किडनी की पथरी कितने प्रकार की होती है?" },
    { label: "लक्षण", prompt: "किडनी की पथरी के सामान्य लक्षण क्या हैं?" },
    { label: "बचाव", prompt: "मैं किडनी की पथरी से कैसे बच सकता हूँ?" },
    { label: "RIRS सर्जरी", prompt: "RIRS लेजर सर्जरी क्या है?" },
  ],
};

const PLACEHOLDERS = {
  name: { en: "Type your full name...", hi: "अपना पूरा नाम लिखें..." },
  chat: { en: "Ask about symptoms, RIRS, or surgery...", hi: "लक्षण, RIRS या सर्जरी के बारे में पूछें..." },
  phone: { en: "Enter your phone number...", hi: "अपना फ़ोन नंबर दर्ज करें..." },
};

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  lines.forEach((line, idx) => {
    const bullet = line.match(/^[\s]*[-*•]\s+(.*)/);
    if (bullet) {
      elements.push(
        <div key={idx} className="flex items-start gap-2 ml-1 my-1.5 group">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
          <span className="text-slate-700 leading-snug">{renderInline(bullet[1])}</span>
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={idx} className="h-2" />);
    } else if (line.trim() === "[MAP_EMBED]") {
      elements.push(
        <div key={idx} className="my-3 w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200">
          <iframe
            width="100%"
            height="250"
            frameBorder="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Cure Stone Hospital Location"
          />
        </div>
      );
    } else if (line.trim().startsWith("[YOUTUBE_EMBED:")) {
      const match = line.trim().match(/\[YOUTUBE_EMBED:(.+)\]/);
      if (match && match[1]) {
        elements.push(
          <div key={idx} className="my-3 w-full rounded-2xl overflow-hidden shadow-sm bg-black border border-slate-200">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${match[1]}?autoplay=0`}
              title="Cure Stone Hospital Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    } else {
      elements.push(
        <p key={idx} className="my-0.5 text-slate-700 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }
  });
  return elements;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("_") && part.endsWith("_"))
      return (
        <em key={i} className="italic text-slate-500 text-[13px]">
          {part.slice(1, -1)}
        </em>
      );
    return part;
  });
}

export default function KidneyChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const [userName, setUserName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [userMsgCount, setUserMsgCount] = useState<number>(0);
  const [nextPhoneAskCount, setNextPhoneAskCount] = useState<number>(5);
  const [isAskingPhone, setIsAskingPhone] = useState<boolean>(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setMounted(true);
    setMessages([{ role: "bot", content: ONBOARDING[language].name, timestamp: new Date() }]);
    setUserName(null);
    setPhoneNumber(null);
    setIsOnboarding(true);
    setUserMsgCount(0);
    setNextPhoneAskCount(5);
    setIsAskingPhone(false);
    setInput("");
  }, [language]);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);
  useEffect(() => { inputRef.current?.focus(); }, [isOnboarding, isAskingPhone, isTyping]);

  useEffect(() => {
    if (phoneNumber && userName) {
      fetch("/api/capture-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          phoneNumber,
          messages: messages.filter(m => m.role === "user").map(m => ({ role: m.role, content: m.content }))
        })
      }).catch(console.error);
    }
  }, [phoneNumber, userName]);

  const addBotMsg = (content: string) => {
    setMessages((prev) => {
      const newArr = [...prev, { role: "bot", content, timestamp: new Date() } as Message];
      return newArr.length > 10 ? newArr.slice(newArr.length - 10) : newArr;
    });
  };

  const handleReset = () => {
    setMessages([{ role: "bot", content: ONBOARDING[language].name, timestamp: new Date() }]);
    setUserName(null);
    setPhoneNumber(null);
    setIsOnboarding(true);
    setUserMsgCount(0);
    setNextPhoneAskCount(5);
    setIsAskingPhone(false);
    setInput("");
    setIsTyping(false);
  };

  const handleNameCapture = useCallback(async (text: string) => {
    const nameStr = text.trim();
    const userMsg: Message = { role: "user", content: nameStr, timestamp: new Date() };
    setMessages((prev) => {
      const newArr = [...prev, userMsg];
      return newArr.length > 10 ? newArr.slice(newArr.length - 10) : newArr;
    });
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 700));
    setUserName(nameStr);
    setIsOnboarding(false);
    setIsTyping(false);
    addBotMsg(ONBOARDING[language].greeting(nameStr));
  }, [language]);

  const sendChatMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;
      const userMsg: Message = { role: "user", content: text, timestamp: new Date() };

      setMessages((prev) => {
        const newArr = [...prev, userMsg];
        return newArr.length > 10 ? newArr.slice(newArr.length - 10) : newArr;
      });
      setInput("");
      setIsTyping(true);

      let sendToAI = true;

      if (isAskingPhone) {
        const hasPhone = /^\+?\d{10,14}$/.test(text.replace(/\s+/g, ''));
        setIsAskingPhone(false);
        if (hasPhone) {
          setPhoneNumber(text.trim());
        } else {
          setNextPhoneAskCount(userMsgCount + 10);
        }
      } else {
        setUserMsgCount((prev) => prev + 1);
        if (userMsgCount + 1 === nextPhoneAskCount && !phoneNumber) {
          await new Promise((r) => setTimeout(r, 700));
          addBotMsg(ONBOARDING[language].phone);
          setIsAskingPhone(true);
          setIsTyping(false);
          sendToAI = false;
        }
      }

      if (sendToAI) {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              language,
              userName,
              messages: [...messages, userMsg].slice(-10).map((m) => ({
                role: m.role === "user" ? "user" : "assistant",
                content: m.content,
              })),
            }),
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          addBotMsg(data.reply);
        } catch {
          const err =
            language === "en"
              ? "I'm having trouble connecting. Please call **+91 88002 63884** for help."
              : "मुझसे संपर्क करने में समस्या हो रही है। सहायता के लिए कृपया **+91 88002 63884** पर कॉल करें।";
          addBotMsg(err);
        } finally {
          setIsTyping(false);
        }
      }
    },
    [isTyping, messages, language, userName, isAskingPhone, phoneNumber, userMsgCount, nextPhoneAskCount]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    isOnboarding ? handleNameCapture(input) : sendChatMessage(input);
  };

  const showQuickPrompts = !isOnboarding && messages.filter((m) => m.role === "user").length === 1 && !isAskingPhone;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-grow pt-20 md:pt-28 pb-4 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col h-[calc(100svh-120px)] md:h-[780px] px-3 md:px-6">
          <div className="hidden md:block mb-6 text-center">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Cure Stone <span className="text-primary italic">Intelligence</span>
            </h1>
          </div>

          <div className="flex-grow flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.1)] border border-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-slate-50 bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-lg shadow-slate-200/50">
                    <Image
                      src="/Curestone wm.png"
                      alt="Cure Stone AI"
                      width={40}
                      height={40}
                      className="object-contain p-1 transform scale-110"
                      unoptimized
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">
                    Cure Stone AI
                  </p>
                  <button
                    onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                    className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-lg hover:bg-primary/20 transition-all border border-primary/20"
                  >
                    {language === "en" ? "हिन्दी में पूछें" : "Switch to English"}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all"
                >
                  {language === "en" ? "Reset" : "साफ़ करें"}
                </button>
                <Link
                  href="/book"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all"
                >
                  {language === "en" ? "Book Visit" : "मिलने का समय लें"}
                </Link>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-grow overflow-y-auto px-4 md:px-8 py-6 space-y-5 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col gap-1.5 max-w-[90%] md:max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm text-[14px] md:text-[15px] ${msg.role === "user"
                          ? "bg-primary text-white rounded-tr-none font-semibold"
                          : "bg-[#F1F5F9] text-slate-800 rounded-tl-none border border-slate-200/50"
                        }`}
                    >
                      {msg.role === "bot" ? renderMarkdown(msg.content) : msg.content}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-tighter">
                      {msg.role === "user" ? (language === "en" ? "You" : "आप") : "Cure Stone AI"} •{" "}
                      {mounted
                        ? msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "--:--"}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-6 py-4 rounded-3xl rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 200, 400].map((delay) => (
                        <div
                          key={delay}
                          className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showQuickPrompts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {QUICK_PROMPTS[language].map((qp, i) => (
                    <button
                      key={i}
                      onClick={() => sendChatMessage(qp.prompt)}
                      className="text-left px-4 py-3 rounded-2xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <p className="text-[10px] font-black text-primary uppercase mb-0.5 tracking-widest">
                        {language === "en" ? "Quick Question" : "त्वरित प्रश्न"}
                      </p>
                      <p className="text-xs font-bold text-slate-700 group-hover:text-primary">{qp.label}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 md:p-6 bg-white border-t border-slate-50">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-slate-100 rounded-2xl md:rounded-full p-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
              >
                <input
                  ref={inputRef}
                  type={isAskingPhone ? "tel" : "text"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={PLACEHOLDERS[isOnboarding ? "name" : (isAskingPhone ? "phone" : "chat") as keyof typeof PLACEHOLDERS][language]}
                  className="flex-grow bg-transparent px-5 py-3 outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400"
                  disabled={isTyping}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-primary text-white w-12 h-12 md:w-14 md:h-11 rounded-xl md:rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
                >
                  <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-[0.2em]">
                {language === "en" ? "Built for Precision • Cure Stone" : "सटीकता के लिए निर्मित • क्योर स्टोन"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
