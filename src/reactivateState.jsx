import React from 'react';

export function dotGet(object, chain) {
    return chain.split('.').reduce((last, property) => {
        if (typeof last === 'object' && last !== null) {
            return last[property];
        }
        return null;
    }, object);
}

export function awareState(state, way = '') {
    Object.defineProperty(state, 'meta', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: {},
    });
    Object.keys(state).forEach((property) => {
        let currentWay = way ? way + '.' + property : property;
        Object.defineProperty(state.meta, property, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: currentWay,
        });
        if (typeof state[property] === 'object') {
            awareState(state[property], currentWay);
        }
    });
}

// not compiling
export function connect(mapStateToProps) {
    return function (Wrappable) {
        // return class Connector extends React.Component {
        //     render() {
        //         console.log(this);
        //         return (<Wrappable />);
        //     }
        // }
    }
}

export function observe(state, listener, newState = {}) {
    if (Array.isArray(state)) {
        return state.map(item => observe(item, listener, newState));
    } else {
        Object.keys(state).forEach((property) => {
            // const propTypeof = typeof state[property];
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