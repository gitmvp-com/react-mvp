/**
 * Demo application showcasing React MVP features
 */

import { createElement, useState, render } from '../src/index.js';

/**
 * Counter component demonstrating state management
 */
function Counter() {
  const [count, setCount] = useState(0);

  return createElement('div', { className: 'section' },
    createElement('h2', null, '🔢 Counter Component'),
    createElement('div', { className: 'counter-display' },
      createElement('p', null, 'Current count:'),
      createElement('div', { className: 'count' }, count)
    ),
    createElement('div', { className: 'button-group' },
      createElement('button', {
        onClick: () => setCount(count - 1)
      }, '- Decrement'),
      createElement('button', {
        onClick: () => setCount(0),
        className: 'secondary'
      }, 'Reset'),
      createElement('button', {
        onClick: () => setCount(count + 1)
      }, '+ Increment')
    )
  );
}

/**
 * Todo List component demonstrating list rendering and state
 */
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return createElement('div', { className: 'section' },
    createElement('h2', null, '✅ Todo List'),
    createElement('div', { className: 'todo-input-group' },
      createElement('input', {
        type: 'text',
        value: input,
        placeholder: 'Enter a new todo...',
        onInput: (e) => setInput(e.target.value),
        onKeyPress: (e) => e.key === 'Enter' && addTodo()
      }),
      createElement('button', { onClick: addTodo }, 'Add Todo')
    ),
    todos.length === 0
      ? createElement('div', { className: 'empty-state' }, 
          'No todos yet. Add one above!')
      : createElement('ul', { className: 'todo-list' },
          ...todos.map(todo =>
            createElement('li', {
              key: todo.id,
              className: todo.completed ? 'todo-item completed' : 'todo-item'
            },
              createElement('span', {
                className: 'todo-text',
                onClick: () => toggleTodo(todo.id)
              }, todo.text),
              createElement('button', {
                className: 'delete-btn',
                onClick: () => deleteTodo(todo.id)
              }, 'Delete')
            )
          )
        ),
    todos.length > 0 && createElement('div', { className: 'stats' },
      `${completedCount} of ${todos.length} completed`
    )
  );
}

/**
 * Main App component
 */
function App() {
  return createElement('div', { className: 'container' },
    createElement('h1', null, 'React MVP'),
    createElement('p', { className: 'subtitle' }, 
      'A minimal implementation of React\'s core features'),
    createElement(Counter, null),
    createElement(TodoList, null)
  );
}

// Render the app
render(
  createElement(App, null),
  document.getElementById('root')
);
