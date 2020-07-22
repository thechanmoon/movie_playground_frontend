import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './store/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

// const store = createStore(reducer)
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
