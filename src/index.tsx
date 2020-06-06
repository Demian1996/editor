import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from './container/Editor';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return <Editor></Editor>;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// 模块热更新的 API
if (module.hot) {
  module.hot.accept();
}
