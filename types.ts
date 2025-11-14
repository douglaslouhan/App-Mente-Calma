export type User = {
  name: string;
  email: string;
};

export type Tab = 'Rilane' | 'Guias' | 'Diário' | 'Tarefas' | 'Comunidade';

export interface DiarioEntry {
  id: number;
  type: 'emotion' | 'sleep';
  content: string;
  date: string;
}

export interface Tarefa {
  id: number;
  text: string;
  completed: boolean;
}

export interface Guide {
  dia: number;
  title: string;
  description: string;
  pdfUrl: string;
  mockupUrl: string;
}

export interface PremiumGuide {
    title: string;
    description: string;
    pdfUrl: string;
    mockupUrl: string;
    buyUrl: string;
}

export interface ChatMessage {
    sender: 'user' | 'rilane';
    text: string;
}
