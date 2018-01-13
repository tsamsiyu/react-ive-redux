import React from 'react';
import { render } from 'react-dom';
import { awareState, observe, dotGet } from '../../src/reactivateState.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


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

const clearer = setInterval(() => {
  store.dispatch({
    type: 'SOMETHING',
  });
}, 1000);

setTimeout(() => {
  clearInterval(clearer);
}, 2000);

const state = store.getState();

// maybe need to monkey patch the core `getState`
awareState(state);

function connect(mapStateToProps) {
  return function (Wrappable) {
      return class Connector extends React.Component {

        constructor(props, context) {
          super(props, context);
          this.store = store; // TODO: fix this, why store isn't available in context?
          this.stateDeps = {};
          this.shouldUpdate = false;
        }

        componentWillUpdate() {
          this.stateDeps = {};
        }

        componentWillMount() {
          this.setupState();
          this.listenUpdates();
        }

        setupState() {
          let state = mapStateToProps(this.store.getState(), this.props);
          state = observe(state, (way, val) => {
            this.stateDeps[way] = val;
            // console.log('new dependency ', way, val);
          });
          console.log('setup state', state);
          this.setState({store: state});
        }

        listenUpdates() {
          this.store.subscribe(() => {
            let snapshot = this.store.getState();
            const depsKeys = Object.keys(this.stateDeps);
            for (var i = 0; i < depsKeys.length; i++) {
              const newValue = dotGet(snapshot, depsKeys[i]);
              const prevValue = this.stateDeps[depsKeys[i]];
                // console.log('checking', depsKeys[i], prevValue, newValue, prevValue === newValue);                
                if (prevValue !== newValue) {
                this.setupState();
                break;
              }
            }
          });
        }

        render() {
          console.log('==== render called =====');
          return <Wrappable store={this.state.store} />;
        }
      }
  }
}

const connector = connect(function (state) {
  return state.todos;
});

class App extends React.Component {
  render () {
    return <div>
      Hello React project
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
    <AppWithStore />
  </Provider>, 
  document.getElementById('app')
);