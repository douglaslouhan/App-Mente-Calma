import React, { useState, useEffect } from 'react';
import { DiarioEntry } from '../types';

const DiarioScreen: React.FC = () => {
  const [emotion, setEmotion] = useState('');
  const [sleep, setSleep] = useState('');
  const [entries, setEntries] = useState<DiarioEntry[]>([]);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('diarioEntries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
        console.error("Failed to load journal entries from localStorage", error);
    }
  }, []);

  const saveEntry = (type: 'emotion' | 'sleep', content: string) => {
    if (!content.trim()) return;

    const newEntry: DiarioEntry = {
      id: Date.now(),
      type,
      content,
      date: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    try {
        localStorage.setItem('diarioEntries', JSON.stringify(updatedEntries));
    } catch (error) {
        console.error("Failed to save journal entries to localStorage", error);
    }

    if (type === 'emotion') setEmotion('');
    if (type === 'sleep') setSleep('');
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-[#4A2C6B] mb-6">Meu Diário</h1>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <label htmlFor="emotion-input" className="block text-lg font-semibold text-[#4A2C6B] mb-2">Registrar Emoção</label>
          <textarea
            id="emotion-input"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Como você está se sentindo agora?"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#A185D7] focus:outline-none"
            rows={3}
          />
          <button onClick={() => saveEntry('emotion', emotion)} className="mt-2 w-full bg-[#A185D7] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#4A2C6B] transition-all duration-300 hover:scale-105">
            Salvar Emoção
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <label htmlFor="sleep-input" className="block text-lg font-semibold text-[#4A2C6B] mb-2">Registrar Sono</label>
          <textarea
            id="sleep-input"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            placeholder="Como foi sua noite de sono?"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#A185D7] focus:outline-none"
            rows={3}
          />
          <button onClick={() => saveEntry('sleep', sleep)} className="mt-2 w-full bg-[#A185D7] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#4A2C6B] transition-all duration-300 hover:scale-105">
            Salvar Sono
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#4A2C6B] mb-4">Últimos Registros</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhum registro ainda. Comece a escrever seu diário!</p>
        ) : (
          <ul className="space-y-4">
            {entries.map(entry => (
              <li key={entry.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${entry.type === 'emotion' ? 'text-pink-500' : 'text-blue-500'}`}>
                        {entry.type === 'emotion' ? 'Emoção' : 'Sono'}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="mt-2 text-gray-700">{entry.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DiarioScreen;
