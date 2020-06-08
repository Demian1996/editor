import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Editor from './container/Editor';

class App extends Component {
  render() {
    return <Editor></Editor>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// 模块热更新的 API
if (module.hot) {
  module.hot.accept();
}
