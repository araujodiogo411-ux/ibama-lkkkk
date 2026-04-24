/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  ArrowLeft, 
  Paperclip, 
  Smile, 
  Mic, 
  CheckCheck,
  X,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
  image?: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Você viu o fugitivo?',
      sender: 'system',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const RESPONSE_TEXT = "Estamos aprocura de um fugitivo que havia aparecido na escola Tiradentes, foi solicitado o IBAMA mas o animal voltou a ser fugitivo, se você encontrou ou viu ele por ai nos diga a recompensa é de R$ 1,000,000,00 . Se você encontrou digite assim \"ENCONTREI:\" e adicione a localização . mas se você só viu digite: \"Localização\" e coloque a localização";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // System logic logic
    setTimeout(() => {
      const isFound = currentInput.toUpperCase().startsWith('ENCONTREI:');
      
      const systemReply: Message = {
        id: (Date.now() + 1).toString(),
        text: isFound ? 'obg' : RESPONSE_TEXT,
        sender: 'system',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        image: isFound ? 'https://i.ibb.co/nN74LV03/images-1.png' : undefined
      };

      setMessages(prev => [...prev, systemReply]);
    }, 1000);
  };

  const startCall = () => {
    setIsCalling(true);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b141a] text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-[#202c33] p-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <ArrowLeft className="text-[#aebac1] cursor-pointer" size={24} />
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center border border-gray-600">
               <span className="text-xl">🕵️</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#202c33] rounded-full"></div>
          </div>
          <div>
            <h1 className="font-medium text-sm md:text-base">Busca IBAMA/Puli</h1>
            <p className="text-[10px] md:text-xs text-[#8696a0]">visto recentemente</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-[#aebac1]">
          <Video size={20} className="hidden sm:block cursor-pointer" />
          <Phone size={20} className="cursor-pointer" onClick={startCall} />
          <MoreVertical size={20} className="cursor-pointer" />
        </div>
      </header>

      {/* Chat Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://i.pinimg.com/originals/ab/ab/60/abab600f77977a417036611933ba0581.jpg')] bg-repeat opacity-95 scroll-smooth"
      >
        <div className="flex justify-center mb-6">
          <span className="bg-[#182229] text-[#8696a1] text-[11px] px-3 py-1 rounded-md uppercase tracking-wider">HOJE</span>
        </div>

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] md:max-w-[65%] p-2 rounded-lg relative ${
                  msg.sender === 'user' 
                    ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' 
                    : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
                }`}
              >
                {/* Arrow for bubble */}
                <div className={`absolute top-0 w-2 h-3 ${
                  msg.sender === 'user' 
                    ? 'right-[-8px] border-l-[8px] border-l-[#005c4b] border-b-[8px] border-b-transparent' 
                    : 'left-[-8px] border-r-[8px] border-r-[#202c33] border-b-[8px] border-b-transparent'
                }`}></div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.image && (
                    <motion.div 
                      className="mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <img 
                        src={msg.image} 
                        alt="Comprovante" 
                        className="rounded-md max-w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  )}

                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-[#8696a0] font-light leading-none">{msg.timestamp}</span>
                    {msg.sender === 'user' && <CheckCheck size={14} className="text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Input Area */}
      <footer className="bg-[#202c33] p-2 flex items-center gap-2">
        <div className="flex gap-1 text-[#8696a0]">
          <button className="p-2 hover:bg-[#3b4a54] rounded-full transition-colors">
            <Smile size={24} />
          </button>
          <button className="p-2 hover:bg-[#3b4a54] rounded-full transition-colors">
            <Paperclip size={24} className="rotate-45" />
          </button>
        </div>
        
        <form onSubmit={handleSendMessage} className="flex-1 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Mensagem"
            className="w-full bg-[#2a3942] rounded-lg px-4 py-2 focus:outline-none text-sm placeholder-[#8696a0]"
          />
          {inputValue ? (
            <button 
              type="submit"
              className="bg-[#00a884] text-[#202c33] p-2.5 rounded-full hover:bg-[#008f6f] transition-colors"
            >
              <Send size={20} strokeWidth={2.5} />
            </button>
          ) : (
            <button 
              type="button" 
              className="bg-[#00a884] text-[#202c33] p-2.5 rounded-full hover:bg-[#008f6f] transition-colors"
            >
              <Mic size={20} strokeWidth={2.5} />
            </button>
          )}
        </form>
      </footer>

      {/* Calling Simulation Modal */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm flex flex-col items-center gap-8"
            >
              <div className="text-center space-y-2">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-600 flex items-center justify-center border-4 border-gray-700 shadow-xl overflow-hidden mb-4">
                  <span className="text-6xl animate-pulse">🕵️</span>
                </div>
                <h2 className="text-2xl font-semibold">Busca IBAMA/Puli</h2>
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <PhoneCall size={16} className="animate-bounce" />
                  <span className="text-sm font-medium">Chamada de voz em andamento...</span>
                </div>
              </div>

              <div className="bg-[#202c33] p-6 rounded-xl border border-gray-700 text-center max-w-xs shadow-2xl">
                <p className="text-sm italic text-[#8696a0] mb-2 leading-relaxed">&quot;{RESPONSE_TEXT}&quot;</p>
              </div>

              <button 
                onClick={() => setIsCalling(false)}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
