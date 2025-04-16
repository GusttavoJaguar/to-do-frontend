import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = 'https://to-do-api-nt50.onrender.com/tasks';

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      alert('Falha ao carregar tarefas. Verifique o console.');
    }
  };

  // Adicionando o useEffect para buscar as tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, []); // O array vazio garante que o efeito será executado apenas uma vez

  const addTask = async () => {
    if (newTask.trim() === '') return;
    try {
      await axios.post(API_URL, { 
        task: { 
          title: newTask, 
          completed: false 
        } 
      });
      setNewTask('');
      await fetchTasks();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await axios.put(`${API_URL}/${id}`, { 
        task: { 
          completed: !task.completed 
        } 
      });
      await fetchTasks();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  if (tasks.length === 0) {
    return <div>Carregando tarefas...</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Lista de Tarefas</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              marginRight: '10px'
            }}>
              {task.title}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'red'
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;