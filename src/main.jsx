import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const httpLink = createHttpLink({
  uri: 'https://graph-app-uzb.herokuapp.com/graphql',
});

const wsLink = () => {
	const token = localStorage.getItem('token');
	return new WebSocketLink({
			uri: `wss://graph-app-uzb.herokuapp.com/graphql`,
			options: {
			reconnect: true,
			timeout: 30000,
			connectionParams: {
				Authorization: `Bearer ${token}`,
				authToken: token
			}
		}
	});
};

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query);
	  return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
	  );
	},
	wsLink(),
	httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
