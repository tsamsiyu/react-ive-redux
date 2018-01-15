import React from 'react'
import { render } from 'react-dom'
import { awareState, observe, connect as newConnect } from 'react-ive-redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from 'store'
import { App } from './App.jsx'

setTimeout(() => {
  store.dispatch({type: 'SOMETHING'});
  store.dispatch({type: 'SOMETHING'});
  store.dispatch({type: 'SOMETHING'});
  store.dispatch({type: 'SOMETHING'});
  store.dispatch({type: 'SOMETHING'});
  store.dispatch({type: 'SOMETHING'});
}, 500);

const mapStateToProps = state => state

const AppWithStore1 = newConnect(mapStateToProps)(App);
const AppWithStore2 = connect(mapStateToProps)(App);

render(
  <Provider store={store}>
    <table>
      <tbody>
      <tr>
        <td>
          <AppWithStore1 store={store} type="new" />
        </td>
        <td>
          <AppWithStore2 store={store} type="stable" />
        </td>
      </tr>
      </tbody>
    </table>
  </Provider>, 
  document.getElementById('app')
);