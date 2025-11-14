import React from 'react';
import { UsersIcon } from './Icons';

const ComunidadeScreen: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-[#4A2C6B] mb-6">Comunidade</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center">
            <div className="bg-[#A185D7] p-3 rounded-full mb-4">
                <UsersIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#4A2C6B] mb-2">Mente & Calma - Ansiedade</h2>
            <p className="text-gray-600 mb-4">Um espaço seguro para compartilhar experiências e encontrar apoio mútuo.</p>
            <a href="https://t.me/+Q_uHKjQNWY80Y2Ux" target="_blank" rel="noopener noreferrer" className="w-full bg-[#4A2C6B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#A185D7] transition-all duration-300">
                Entrar no Grupo Gratuito
            </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center border-2 border-[#8EEA95]">
            <div className="bg-[#8EEA95] p-3 rounded-full mb-4">
                <UsersIcon className="h-8 w-8 text-[#4A2C6B]" />
            </div>
            <h2 className="text-xl font-bold text-[#4A2C6B] mb-2">Comunidade OFFANSIEDADE</h2>
            <p className="text-gray-600 mb-4">Acesso exclusivo ao nosso chat para membros, com conteúdos e suporte direto.</p>
            <a href="https://t.me/+evjtLqd0eJcwYWFh" target="_blank" rel="noopener noreferrer" className="w-full bg-[#8EEA95] text-[#4A2C6B] font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300">
                Acessar Chat Exclusivo
            </a>
        </div>
      </div>
    </div>
  );
};

export default ComunidadeScreen;
