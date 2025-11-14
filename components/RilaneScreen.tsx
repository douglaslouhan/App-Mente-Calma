import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const RilaneScreen: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: "Você é Rilane, uma psicóloga IA gentil e compassiva. Seu objetivo é ajudar o usuário a navegar pela ansiedade com técnicas de TCC, calma e neurociência. Suas respostas devem ser curtas e diretas ao ponto, como em um chat.",
        },
      });
      setChat(newChat);
      setMessages([{ sender: 'rilane', text: 'Olá! Como posso te ajudar a encontrar um pouco mais de calma hoje?' }]);
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error);
      setMessages([{ sender: 'rilane', text: 'Desculpe, não consegui me conectar. Verifique a configuração da sua chave de API.' }]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !chat) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await chat.sendMessage({ message: input });
      const response = result;
      const rilaneMessage: ChatMessage = { sender: 'rilane', text: response.text };
      setMessages(prev => [...prev, rilaneMessage]);
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage: ChatMessage = { sender: 'rilane', text: 'Sinto muito, ocorreu um erro ao processar sua mensagem.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
        <header className="bg-[#A185D7] p-4 text-white text-center shadow-md">
            <h1 className="text-xl font-bold">Conversar com Rilane</h1>
        </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-[#4A2C6B] text-white rounded-br-none' : 'bg-gray-200 text-[#4A2C6B] rounded-bl-none'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-[#4A2C6B] rounded-2xl rounded-bl-none px-4 py-2">
              <span className="animate-pulse">Digitando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A185D7]"
          disabled={loading}
          aria-label="Sua mensagem"
        />
        <button type="submit" disabled={loading || !input.trim()} className="ml-3 bg-[#4A2C6B] text-white p-2.5 rounded-full disabled:bg-gray-400 hover:bg-[#A185D7] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
};

export default RilaneScreen;
