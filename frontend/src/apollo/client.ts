import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import keycloak, {refreshToken, isTokenExpired} from '../services/keycloak';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
});

const authLink = setContext(async (_, {headers}) => {
    if (isTokenExpired()) {
        const refreshed = await refreshToken();
        if (!refreshed) {
            console.error('Token refresh failed');
        }
    }

    const token = localStorage.getItem('token') || '';
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default client;
