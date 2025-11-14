import React from 'react';

// Esta é a nova tela da Rilane, que não é mais um chat.
// É uma página de "card" que leva para o seu agente externo do ChatGPT.
const RilaneScreen: React.FC = () => {
  
  // 1. Defina o título, imagem e link do seu agente aqui
  const agentData = {
    title: "Rilane IA",
    description: "Clique abaixo para abrir nossa conversa em uma nova janela e começar sua jornada de autoconhecimento.",
    // Você pode trocar esta imagem por uma sua no futuro
    imageUrl: "https://placehold.co/600x400/A185D7/FFFFFF?text=Rilane+IA&font=inter", 
    // ⚠️ Este é o seu link do ChatGPT que você mandou
    agentUrl: "https://chatgpt.com/g/g-69173970d124819181cff75ab0a8c19f-psicologa-rilane-mente-calma" 
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-100 p-4 sm:p-8 items-center">
      {/* Header */}
      <header className="bg-white p-4 text-center shadow-md rounded-lg mb-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#4A2C6B]">Sua Psicóloga IA</h1>
      </header>

      {/* Card do Agente */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full mx-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <img src={agentData.imageUrl} alt={agentData.title} className="w-full h-56 object-cover" />
        
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-[#4A2C6B] mb-3">{agentData.title}</h2>
          <p className="text-gray-600 mb-6">{agentData.description}</p>
          
          <a
            href={agentData.agentUrl}
            target="_blank" // Abre em uma nova aba
            rel="noopener noreferrer"
            className="inline-block bg-[#4A2C6B] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#A185D7] transition-all duration-300 text-lg"
          >
            Começar a Conversar
          </a>
        </div>
      </div>
    </div>
  );
};

export default RilaneScreen;
