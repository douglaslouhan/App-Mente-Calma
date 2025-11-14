import React, { useState, useEffect } from 'react';
import { Tarefa } from '../types';

const TarefasScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    try {
        const storedTasks = localStorage.getItem('tarefas');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    } catch(error) {
        console.error("Failed to load tasks from localStorage", error);
    }
  }, []);

  const saveTasks = (updatedTasks: Tarefa[]) => {
    setTasks(updatedTasks);
    try {
        localStorage.setItem('tarefas', JSON.stringify(updatedTasks));
    } catch(error) {
        console.error("Failed to save tasks to localStorage", error);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newTasksList = [...tasks, { id: Date.now(), text: newTask, completed: false }];
    saveTasks(newTasksList);
    setNewTask('');
  };

  const handleToggleTask = (id: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-[#4A2C6B] mb-6">Minhas Tarefas</h1>
      
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicionar nova tarefa"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#A185D7] focus:outline-none"
          aria-label="Nova tarefa"
        />
        <button type="submit" className="bg-[#4A2C6B] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#A185D7] transition-all duration-300 hover:scale-105">
          Adicionar
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold text-[#4A2C6B] mb-4">Tarefas Pendentes</h2>
        {pendingTasks.length > 0 ? (
            <ul className="space-y-2">
            {pendingTasks.map(task => (
                <li key={task.id} className="flex items-center bg-white p-3 rounded-lg shadow-md">
                    <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => handleToggleTask(task.id)}
                        className="h-5 w-5 rounded border-gray-300 text-[#A185D7] focus:ring-[#A185D7]"
                    />
                    <span className="ml-3 text-gray-700">{task.text}</span>
                </li>
            ))}
            </ul>
        ) : <p className="text-gray-500">Nenhuma tarefa pendente. Bom trabalho!</p>}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#4A2C6B] mb-4">Tarefas Concluídas</h2>
        {completedTasks.length > 0 ? (
            <ul className="space-y-2">
            {completedTasks.map(task => (
                <li key={task.id} className="flex items-center bg-white p-3 rounded-lg shadow-md opacity-60">
                     <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => handleToggleTask(task.id)}
                        className="h-5 w-5 rounded border-gray-300 text-[#A185D7] focus:ring-[#A185D7]"
                    />
                    <span className="ml-3 text-gray-700 line-through">{task.text}</span>
                </li>
            ))}
            </ul>
        ) : <p className="text-gray-500">Nenhuma tarefa foi concluída ainda.</p>}
      </div>
    </div>
  );
};

export default TarefasScreen;
