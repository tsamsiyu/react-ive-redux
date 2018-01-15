import React from 'react'
import { observe } from './observe';

function dotGet(object, chain) {
    return chain.split('.').reduce((last, property) => {
        if (typeof last === 'object' && last !== null) {
            return last[property];
        }
        return null;
    }, object);
}

export function connect(mapStateToProps) {
    return function (Wrappable) {
        return class Connector extends React.Component {
  
          constructor(props, context) {
            super(props, context);
            this.store = props.store || context.store;
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
              if (way) {
                this.stateDeps[way] = val;
                // console.log('new dependency ', way, val);
              }
            });
            // console.log('setup state', state);
            this.setState({store: state});
          }
  
          listenUpdates() {
            this.store.subscribe(() => {
              // console.log('>>> store updated');
              let snapshot = this.store.getState();
              const depsKeys = Object.keys(this.stateDeps);
              // console.log('dependencies', depsKeys);
              for (var i = 0; i < depsKeys.length; i++) {
                const newValue = dotGet(snapshot, depsKeys[i]);
                const prevValue = this.stateDeps[depsKeys[i]];
                // console.log('checking', depsKeys[i], prevValue, newValue, prevValue === newValue);                
                if (prevValue !== newValue) {
                  // console.log('change state');
                  this.setupState();
                  break;
                }
              }
            });
          }
  
          render() {
            console.log('==== render called =====')
            return <Wrappable {...this.state.store} />
          }
        }
    }
}