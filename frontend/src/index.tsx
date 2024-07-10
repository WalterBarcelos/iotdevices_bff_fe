import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import store from './store/store'; // Import your Redux store
import client from './apollo/client';
import { initKeycloak, loadTokenFromLocalStorage } from './services/keycloak';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const onAuthenticated = () => {
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    </React.StrictMode>
  );
};

initKeycloak(onAuthenticated);
reportWebVitals(console.log);
