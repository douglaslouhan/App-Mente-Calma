import React, { useState, useEffect, useCallback } from 'react';
import { User, Tab } from './types';
import LoginScreen from './components/LoginScreen';
import RilaneScreen from './components/RilaneScreen';
import GuiasScreen from './components/GuiasScreen';
import DiarioScreen from './components/DiarioScreen';
import TarefasScreen from './components/TarefasScreen';
import ComunidadeScreen from './components/ComunidadeScreen';
import BottomNav from './components/BottomNav';
import './components/Icons';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('Guias');

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('menteCalmaUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
        }
    }, []);

    const handleLogin = useCallback((name: string, email: string) => {
        const newUser: User = { name, email };
        try {
            localStorage.setItem('menteCalmaUser', JSON.stringify(newUser));
            const firstLogin = localStorage.getItem('firstLoginDate');
            if (!firstLogin) {
                localStorage.setItem('firstLoginDate', new Date().toISOString());
            }
            setUser(newUser);
            setActiveTab('Guias');
        } catch (error) {
            console.error("Failed to save user to localStorage", error);
        }
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'Rilane':
                return <RilaneScreen />;
            case 'Guias':
                return <GuiasScreen />;
            case 'Diário':
                return <DiarioScreen />;
            case 'Tarefas':
                return <TarefasScreen />;
            case 'Comunidade':
                return <ComunidadeScreen />;
            default:
                return <GuiasScreen />;
        }
    };

    if (!user) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-[#FDF8FF] text-[#4A2C6B]">
            <main className="pb-20">
                {renderContent()}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default App;
