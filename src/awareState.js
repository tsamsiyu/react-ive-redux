export function awareState(state, way = '') {
    if (!state.hasOwnProperty('meta')) {
        Object.defineProperty(state, 'meta', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {},
        });
    }
    Object.keys(state).forEach((property) => {
        let currentWay = way ? way + '.' + property : property;
        if (!state.meta.hasOwnProperty(property)) {
            Object.defineProperty(state.meta, property, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: currentWay,
            });
        }
        if (typeof state[property] === 'object') {
            awareState(state[property], currentWay);
        }
    });
}