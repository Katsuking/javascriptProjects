import React from 'react';
import './App.css';
import Todo from './components/Todo';

export const todos = [
  { id: 1, task: 'wash dishes', completed: true },
  { id: 2, task: 'go to school', completed: false },
];

function App() {
  return (
    <div>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
}

export default App;
