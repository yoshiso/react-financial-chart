import { Children } from 'react';

export const getDisplayName = (Component) => {
    if (!Component) { throw new Error('Component is not defined');  }
    return Component.displayName || Component.name || 'Component';
}

export const findAllByComponent = (children, displayName) => {
  const found = [];
  Children.forEach(children, child => {
    if (!child || !child.type) { return; }
    const childDisplayName = child.type.displayName || child.type.name;
    if (childDisplayName === displayName) {
      found.push(child);
    }
  })
  return found;
}

export const findByComponent = (children, displayName) => {
  const found = findAllByComponent(children, displayName);
  return found.length > 0 ? found[0] : null;
}
