import { createStore } from 'redux'
import { awareState } from 'react-ive-redux'

const initialState = {
    todos: [
      {
        id: 1,
        title: 'Read Hobbit',
      }
    ]
};
  
const store = createStore((state, action) => {
    if (!state) {
      state = initialState;
    } else {
      state.todos[0].id = 2; // it's ok at now
    }
    return state;
}, null);

const prevGetState = store.getState;

store.getState = function() {
    const state = prevGetState();
    awareState(state);  
    return state;
}  

export default store;