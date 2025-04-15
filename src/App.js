import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const API_URL = 'https://to-do-api-nt50.onrender.com/tasks'; // Confirme a URL

  // Buscar tarefas ao carregar
  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error('Erro na rede');
        return response.json();
      })
      .then(data => setTasks(data)) // Aqui está o ajuste chave!
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? '✅' : '⏳'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;