

export const getDisplayName = (Component) => {
    if (!Component) { throw new Error('Component is not defined');  }
    return Component.displayName || Component.name || 'Component';
}
