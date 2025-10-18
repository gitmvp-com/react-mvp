# React MVP

> A minimal MVP implementation of React's core features: component-based rendering and state management

This project is a simplified, educational implementation of React's fundamental concepts, built by reverse-engineering the [official React repository](https://github.com/facebook/react).

## 🎯 Core Features

This MVP implements React's most essential features:

- ✅ **Component-Based Architecture** - Create reusable UI components
- ✅ **JSX-like Syntax** - Use `createElement` to build virtual DOM
- ✅ **State Management** - `useState` hook for reactive state
- ✅ **Efficient Rendering** - Simple virtual DOM reconciliation
- ✅ **Event Handling** - Attach event listeners to elements

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

## 📚 API Reference

### `createElement(type, props, ...children)`

Creates a virtual DOM element.

```javascript
const element = createElement('div', { className: 'container' },
  createElement('h1', null, 'Hello World')
);
```

### `useState(initialValue)`

Manages component state with a reactive hook.

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return createElement('div', null,
    createElement('p', null, `Count: ${count}`),
    createElement('button', { 
      onClick: () => setCount(count + 1) 
    }, 'Increment')
  );
}
```

### `render(element, container)`

Renders a virtual DOM element to the actual DOM.

```javascript
render(
  createElement(App, null),
  document.getElementById('root')
);
```

## 🧪 Example

See the included demo application in `demo/` for a working counter and todo list example.

## 🏗️ Architecture

This MVP mirrors React's core architecture:

```
src/
├── react/           # Core library (like facebook/react/packages/react)
│   ├── createElement.js
│   ├── hooks.js
│   └── index.js
├── react-dom/       # DOM rendering (like facebook/react/packages/react-dom)
│   ├── render.js
│   └── index.js
└── index.js         # Entry point
```

## 📖 How It Works

1. **Virtual DOM**: Components return virtual DOM objects created by `createElement`
2. **State Management**: `useState` tracks state and triggers re-renders
3. **Reconciliation**: When state changes, the component re-renders and updates only changed DOM nodes
4. **Event Handling**: Event listeners are attached during rendering

## 🔍 Differences from Real React

This is an educational MVP. Real React includes:

- Fiber architecture for concurrent rendering
- Advanced reconciliation algorithm (diffing)
- More hooks (useEffect, useContext, useReducer, etc.)
- Server-side rendering
- Error boundaries
- Portals
- Suspense
- And much more!

## 📦 What's Included vs. Full React

| Feature | React MVP | Full React |
|---------|-----------|------------|
| createElement | ✅ | ✅ |
| useState | ✅ | ✅ |
| Component rendering | ✅ | ✅ |
| Virtual DOM | ✅ Simple | ✅ Advanced |
| useEffect | ❌ | ✅ |
| useContext | ❌ | ✅ |
| useReducer | ❌ | ✅ |
| useMemo/useCallback | ❌ | ✅ |
| Concurrent Mode | ❌ | ✅ |
| SSR | ❌ | ✅ |
| Error Boundaries | ❌ | ✅ |

## 🎓 Learning Resources

- [Official React Repository](https://github.com/facebook/react)
- [React Documentation](https://react.dev/)
- [How React Works](https://react.dev/learn/describing-the-ui)

## 📄 License

MIT License - inspired by React's architecture, created for educational purposes.

## 🙏 Acknowledgments

This project is inspired by the [React](https://github.com/facebook/react) library created by Meta and the open-source community.
