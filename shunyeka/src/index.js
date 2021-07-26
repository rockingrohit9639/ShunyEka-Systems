import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataLayer } from "./DataLayer";
import reducer, { inititalState } from "./reducer";

ReactDOM.render(
  <React.StrictMode>

    <DataLayer inititalState={inititalState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);
