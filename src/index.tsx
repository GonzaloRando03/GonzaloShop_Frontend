import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'
import { GQL_ADDR } from './utils/env';

//cliente apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GQL_ADDR + '/graphql',
  })
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

