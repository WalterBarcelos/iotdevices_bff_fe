import axios from 'axios';
import Keycloak from 'keycloak-js';


const keycloakConfig = {
    url: 'http://localhost:8085/auth',
    realm: 'myrealm',
    clientId: 'myclient',
};

const keycloak = new Keycloak({
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
});


export const getTokenDirectly = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
            new URLSearchParams({
                client_id: keycloakConfig.clientId,
                grant_type: 'password',
                username: username,
                password: password,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const {access_token, refresh_token} = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        return true;
    } catch (error) {
        console.error('Failed to obtain token directly:', error);
        return false;
    }
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.error('No refresh token available');
        return false;
    }

    try {
        const response = await axios.post(
            `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
            new URLSearchParams({
                client_id: keycloakConfig.clientId,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const {access_token, refresh_token: newRefreshToken} = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', newRefreshToken);
        return true;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return false;
    }
};

export const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenPayload.exp ? tokenPayload.exp * 1000 : 0;
    return Date.now() >= expirationTime;
};

export const getToken = () => localStorage.getItem('token');

export const logoutKeycloak = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/logout?redirect_uri=${window.location.origin}`;
};

export const initKeycloak = (onAuthenticatedCallback: () => void) => {
    keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    }).then((authenticated) => {
        if (authenticated) {
            localStorage.setItem('token', keycloak.token!);
            localStorage.setItem('refreshToken', keycloak.refreshToken!);
            onAuthenticatedCallback();
        } else {
            onAuthenticatedCallback(); // Proceed without logging in
        }
    }).catch(console.error);

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(30).then((refreshed) => {
            if (refreshed) {
                localStorage.setItem('token', keycloak.token!);
                localStorage.setItem('refreshToken', keycloak.refreshToken!);
            } else {
                console.warn('Token not refreshed, will log in again');
                keycloak.login();
            }
        }).catch(() => {
            console.error('Failed to refresh token, will log in again');
            keycloak.login();
        });
    };
};

export const loadTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (token) {
        keycloak.token = token;
    }
};

export default keycloak;
