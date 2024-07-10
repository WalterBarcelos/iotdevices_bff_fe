import React from 'react';
import {Navigate} from 'react-router-dom';
import {getToken} from '../services/keycloak';

const PrivateRoute = ({children}: { children: JSX.Element }) => {
    const isLoggedIn = !!getToken();

    return isLoggedIn ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;
