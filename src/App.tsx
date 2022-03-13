import * as React from 'react';
import * as ReactDom from 'react-dom';
import HelloWorld from './HelloWorld';

ReactDom.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>,
  document.getElementById('app')
);