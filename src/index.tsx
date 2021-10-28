import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./ReduxToolKit/Store/Store";
import {Provider} from "react-redux";
import { EasybaseProvider } from 'easybase-react';
import ebconfig from "./ebconfig";

ReactDOM.render(
  <React.StrictMode>
      <EasybaseProvider ebconfig={ebconfig}>
          <Provider store={store}>
            <App />
          </Provider>
      </EasybaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
