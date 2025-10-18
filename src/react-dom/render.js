/**
 * DOM rendering implementation
 * Mimics react-dom's rendering logic
 */

import { setCurrentComponent } from '../react/hooks.js';

/**
 * Creates actual DOM node from virtual element
 * @param {object} vNode - Virtual DOM node
 * @returns {HTMLElement|Text} DOM node
 */
function createDOMNode(vNode) {
  if (vNode.type === 'TEXT_ELEMENT') {
    return document.createTextNode(vNode.props.nodeValue);
  }

  const dom = document.createElement(vNode.type);

  // Set properties
  Object.keys(vNode.props)
    .filter(key => key !== 'children')
    .forEach(name => {
      if (name.startsWith('on')) {
        // Event listener
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, vNode.props[name]);
      } else if (name === 'className') {
        dom.className = vNode.props[name];
      } else if (name === 'style' && typeof vNode.props[name] === 'object') {
        Object.assign(dom.style, vNode.props[name]);
      } else {
        dom[name] = vNode.props[name];
      }
    });

  return dom;
}

/**
 * Renders virtual DOM to actual DOM
 * @param {object} vNode - Virtual DOM node
 * @param {HTMLElement} container - Container element
 */
function renderElement(vNode, container) {
  // Handle function components
  if (typeof vNode.type === 'function') {
    const component = {
      hooks: [],
      rerender: () => {
        container.innerHTML = '';
        render(vNode, container);
      }
    };

    setCurrentComponent(component);
    const element = vNode.type(vNode.props);
    setCurrentComponent(null);

    renderElement(element, container);
    return;
  }

  const dom = createDOMNode(vNode);

  // Render children
  vNode.props.children.forEach(child => {
    renderElement(child, dom);
  });

  container.appendChild(dom);
}

/**
 * Main render function - public API
 * @param {object} element - Virtual DOM element to render
 * @param {HTMLElement} container - Container to render into
 */
export function render(element, container) {
  renderElement(element, container);
}
