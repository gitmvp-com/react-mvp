/**
 * State management implementation
 * Mimics React's useState hook
 */

let currentComponent = null;
let hookIndex = 0;

/**
 * Sets the current component context for hooks
 * @param {object} component - Component instance
 */
export function setCurrentComponent(component) {
  currentComponent = component;
  hookIndex = 0;
}

/**
 * useState hook implementation
 * @param {any} initialValue - Initial state value
 * @returns {array} [state, setState] tuple
 */
export function useState(initialValue) {
  if (!currentComponent) {
    throw new Error('useState must be called inside a component');
  }

  const currentHookIndex = hookIndex;
  hookIndex++;

  // Initialize hooks array if it doesn't exist
  if (!currentComponent.hooks) {
    currentComponent.hooks = [];
  }

  // Initialize this hook if it's the first render
  if (currentComponent.hooks[currentHookIndex] === undefined) {
    currentComponent.hooks[currentHookIndex] = {
      state: initialValue
    };
  }

  const hook = currentComponent.hooks[currentHookIndex];

  const setState = (newValue) => {
    const value = typeof newValue === 'function' 
      ? newValue(hook.state) 
      : newValue;
    
    if (hook.state !== value) {
      hook.state = value;
      // Trigger re-render
      if (currentComponent.rerender) {
        currentComponent.rerender();
      }
    }
  };

  return [hook.state, setState];
}
