import React, { useState } from 'react';
import { Guide, PremiumGuide } from '../types';

// Mock data for guides
const freeGuidesData: Guide[] = [
    { 
        dia: 1, 
        title: "Resiliência Emocional: Criando Uma Mente...", 
        description: "Fortaleça sua mente para enfrentar desafios...", 
        pdfUrl: "https://drive.google.com/file/d/1iqbfGr-y2mp0ltCiQwl_JTGsH5uHaU7a/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=13wpSMKYrnJpaQc0j5PjVAFc2pZ72vKYY" 
    },
    { 
        dia: 2, 
        title: "Planner Mente e Calma - 7 Dias...", 
        description: "Um plano prático de 7 dias para organizar...", 
        pdfUrl: "https://drive.google.com/file/d/1McF7-quED96at4fKnhWlOq5DuZbz_bjO/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=1kME-KRDlQ7Ac5SgNjvMkto-MhYf8dw-c" 
    },
    { 
        dia: 3, 
        title: "Guia Prático da Respiração Consciente...", 
        description: "Descubra o poder da respiração como ferramenta...", 
        pdfUrl: "https://drive.google.com/file/d/1tZEpKrE4hqrlrxfmokBf6MEIDGQzzbe3/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=1uPzTJMWs3x2QmpHVhDVMsSaNLN9fuzT" 
    },
    { 
        dia: 4, 
        title: "Desafio 7 Dias: Reduza a Ansiedade...", 
        description: "Um passo a passo leve e transformador...", 
        pdfUrl: "https://drive.google.com/file/d/18h5zx42WVgpv7UPNmQQ6_DgX9oQl__a7/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=1ajhUAK4iFX8z6MYBuFAKL-JDunCy1Z" 
    },
    { 
        dia: 5, 
        title: "Hábitos Anti-Ansiedade", 
        description: "Desenvolva hábitos simples e eficazes...", 
        pdfUrl: "https://drive.google.com/file/d/1hD4b4m_-gc8VnjIAUkDRnw32b5XH-IIN/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=1tAhBvT7y1ECKrPLMYleoprfF-y0lVkT1" 
    },
    { 
        dia: 6, 
        title: "Diário da Calma", 
        description: "Registre emoções, compreenda padrões...", 
        pdfUrl: "https://drive.google.com/file/d/1WsHS6wnHFFhhcNeiRGOyychYnUN80xDQ/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=1kFu6eiwGOqthznVDDSlwqBqKymijDuhE0" 
    },
    { 
        dia: 7, 
        title: "Método 3XR: Reconheça. Reprograme. Respire.", 
        description: "Um método prático baseado em psicologia...", 
        pdfUrl: "https://drive.google.com/file/d/1Q_-u-BtDhSgWtA-KyOTdb2Qp7mAcP5go/preview", 
        mockupUrl: "https://drive.google.com/uc?export=view&id=1FRaNWce78GiaNMA77wDgzYKwe1aRz6eX" 
    }
];

const premiumGuidesData: PremiumGuide[] = [
    { 
      title: "Detox Emocional em 21 Dias: Um Reset Profundo", 
      description: "Este protocolo completo de 21 dias é projetado para limpar sua mente e reequilibrar suas emoções. Através de pequenas ações diárias, você promove um corpo emocional saudável, criando um ambiente interno leve, calmo e focado. Ideal para quem busca um reset emocional profundo, este caminho ajuda a transformar seu estado mental e emocional de forma gradual e sustentável.", 
      pdfUrl: "https://drive.google.com/file/d/1_placeholder-pdf-detox/preview", 
      mockupUrl: "https://drive.google.com/uc?export=view&id=1x_eK-S3v7FWpbT5mYnJB_rRZl4oUaId", 
      buyUrl: "https://pay.cakto.com.br/3epmrhp_395695" 
    },
    { 
      title: "Código Mental: Reprogramação Antiansiedade", 
      description: "Este documento apresenta um método avançado de reprogramação emocional fundamentado na neurociência para eliminar os ciclos recorrentes de ansiedade. Com técnicas simples e eficazes, visa proporcionar controle mental mesmo nos momentos mais difíceis, prevenindo recaídas. O conteúdo abrange desde a compreensão dos mecanismos neurológicos da ansiedade até a aplicação prática diária das técnicas.", 
      pdfUrl: "https://drive.google.com/file/d/1_placeholder-pdf-codigo/preview", 
      mockupUrl: "https://drive.google.com/uc?export=view&id=1gB_n-pA2hJ_KL9_cE0_fDq_sWxXyZ_uI",
      buyUrl: "https://pay.cakto.com.br/evmbvpk_395699" 
    }
];

const PdfViewerModal: React.FC<{ pdfUrl: string; onClose: () => void }> = ({ pdfUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full h-full max-w-4xl max-h-[95vh] flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
                <h3 className="text-lg font-bold text-[#4A2C6B]">Visualizador de Guia</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none" aria-label="Fechar">&times;</button>
            </div>
            <div className="flex-grow">
                <iframe src={pdfUrl} width="100%" height="100%" style={{ border: 'none' }} title="Visualizador de PDF"></iframe>
            </div>
        </div>
    </div>
);


const GuideCard: React.FC<{ guide: Guide; onOpen: (pdfUrl: string) => void }> = ({ guide, onOpen }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
            <img src={guide.mockupUrl} alt={guide.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg text-[#4A2C6B]">{guide.title}</h3>
                <p className="text-sm text-gray-600 mt-1 flex-grow">{guide.description}</p>
                <button 
                    onClick={() => onOpen(guide.pdfUrl)} 
                    className="mt-4 w-full bg-[#4A2C6B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#A185D7] transition-all duration-300"
                >
                    Abrir Guia
                </button>
            </div>
        </div>
    );
};

const PremiumGuideCard: React.FC<{ guide: PremiumGuide }> = ({ guide }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
        <img src={guide.mockupUrl} alt={guide.title} className="w-full h-32 object-cover" />
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg text-[#4A2C6B]">{guide.title}</h3>
            <p className="text-sm text-gray-600 mt-1 flex-grow">{guide.description}</p>
            <a href={guide.buyUrl} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-[#8EEA95] text-[#4A2C6B] font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 text-center">
                Adquirir Guia
            </a>
        </div>
    </div>
);

const GuiasScreen: React.FC = () => {
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <div className="p-4">
      {selectedPdf && <PdfViewerModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />}

      <h1 className="text-3xl font-bold text-[#4A2C6B] mb-6">Guias Práticos</h1>
      
      <section>
        <h2 className="text-2xl font-bold text-[#4A2C6B] mb-4">Jornada Mente & Calma</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freeGuidesData.map(guide => (
            <GuideCard key={guide.dia} guide={guide} onOpen={setSelectedPdf} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-[#4A2C6B] mb-4">Guias Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumGuidesData.map((guide, index) => (
            <PremiumGuideCard key={index} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GuiasScreen;