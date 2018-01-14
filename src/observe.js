import React from 'react';

export function observe(state, listener, newState = {}) {
    if (Array.isArray(state)) {
        return state.map(item => observe(item, listener, newState));
    } else {
        Object.keys(state).forEach((property) => {
            Object.defineProperty(newState, property, {
                configurable: false,
                enumerable: true,
                get: () => {
                    const way = state.meta && state.meta[property] ? state.meta[property] : null;
                    listener.call(null, way, state[property]);
                    return state[property];
                },
                set: () => {
                    throw new Error('State is immutable!');
                }
            });
            if (typeof state[property] === 'object') {
                observe(state[property], listener, newState[property]);
            }
        });
        return newState;
    }
}
