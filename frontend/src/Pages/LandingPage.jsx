import React from 'react';
import { useSelector } from 'react-redux';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';

export default function LandingPage() {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div>
            {currentUser ? <WelcomePage /> : <HomePage />}
        </div>
    );
}
