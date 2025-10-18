/**
 * Creates a virtual DOM element
 * This is the core function that mimics React.createElement
 * 
 * @param {string|function} type - HTML tag name or component function
 * @param {object} props - Element properties/attributes
 * @param {...any} children - Child elements
 * @returns {object} Virtual DOM element
 */
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.flat().map(child => 
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

/**
 * Creates a text node element
 * @param {string|number} text - Text content
 * @returns {object} Virtual text element
 */
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}
