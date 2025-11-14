import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (name: string, email: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onLogin(name, email);
    }
  };
  
  const Logo = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-[#4A2C6B]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#A185D7"/>
      <path d="M12 12.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm0-4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" fill="#A185D7"/>
      <path d="M12 14c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5zm5.91 3.5H6.09c.47-1.02 2.57-2 5.91-2s5.44.98 5.91 2z" fill="#A185D7"/>
    </svg>
  );


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8FF] p-4">
      <div className="w-full max-w-sm mx-auto text-center">
        <Logo />
        <h1 className="text-3xl font-bold text-[#4A2C6B] mt-4">Mente & Calma</h1>
        <p className="text-[#4A2C6B] opacity-80 mt-2 mb-8">Seu refúgio diário para a serenidade.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-[#4A2C6B] focus:ring-2 focus:ring-[#A185D7] focus:outline-none transition-all duration-300"
            aria-label="Seu nome"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-[#4A2C6B] focus:ring-2 focus:ring-[#A185D7] focus:outline-none transition-all duration-300"
            aria-label="Seu e-mail"
          />
          <button
            type="submit"
            className="w-full bg-[#4A2C6B] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#A185D7] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
