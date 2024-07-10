import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import { logoutKeycloak } from '../services/keycloak';

// Mock the logoutKeycloak function
jest.mock('../services/keycloak', () => ({
    logoutKeycloak: jest.fn(),
}));

describe('Navbar Component', () => {
    beforeEach(() => {
        (logoutKeycloak as jest.Mock).mockClear();
    });

    test('renders Navbar component', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Devices')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('navigates to the correct links', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
        expect(screen.getByText('Devices').closest('a')).toHaveAttribute('href', '/devices');
    });

    test('handles logout correctly', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );
        fireEvent.click(screen.getByText('Logout'));
        expect(logoutKeycloak).toHaveBeenCalledTimes(1);
    });
});
