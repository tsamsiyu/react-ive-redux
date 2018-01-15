import { createStore } from 'redux'
import { awareState } from 'react-ive-redux'
import Chance from 'chance'

const chance = new Chance()

let regenerateIndex = 0;

const store = createStore((state, action) => {
  if (regenerateIndex > 5) {
    regenerateIndex = 0;
  } else {
    regenerateIndex++;
  }
  if (!state) {
    state = {
      todos: Array.from(new Array(100), (val, id) => ({
        id,
        title: chance.first(),
        tags: Array.from(new Array(5), (val, tagid) => ({
          id: tagid,
          label: chance.word(),
        }))
      }))
    }
  }
  if (regenerateIndex == 0) {
    console.log('regenerate');
    state.todos[47].tags = Array.from(new Array(5), (val, tagid) => ({
      id: tagid,
      label: chance.word(),
    }))
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