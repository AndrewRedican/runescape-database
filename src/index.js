import React, { Component }             from 'react'
import ReactDOM                         from 'react-dom'
import { Provider }                     from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducers                         from './reducers'
import ReduxPromise                     from 'redux-promise'
import ReduxThunk                       from 'redux-thunk'
import App                              from './components/app'
import './index.css'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise,ReduxThunk)(createStore)
export const store = createStoreWithMiddleware(Reducers)

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  , document.querySelector('#app')
)