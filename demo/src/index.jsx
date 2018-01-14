import React from 'react';
import { render } from 'react-dom';
import { awareState, observe, connect } from 'react-ive-redux';
import { Provider } from 'react-redux';
import store from 'store';

console.log('store created', store);

const clearer = setInterval(() => {
  store.dispatch({
    type: 'SOMETHING',
  });
}, 1000);

setTimeout(() => {
  clearInterval(clearer);
}, 2000);

const connector = connect(function (state) {
  return state.todos;
});

class App extends React.Component {
  render () {
    return <div>
      Hello React project
      <br/>
      { this.props.store.map((todo) => (
        <div key={ todo.id }>
          { todo.id } : { todo.title }
        </div>
      )) }
    </div>;
  }
}

const AppWithStore = connector(App);

render(
  <Provider store={store}>
    <AppWithStore store={store}/>
  </Provider>, 
  document.getElementById('app')
);