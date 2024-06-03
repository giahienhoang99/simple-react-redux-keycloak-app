// src/callback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from './oidc-client';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        userManager.signinRedirectCallback().then(() => {
            navigate('/');
        }).catch((error) => {
            console.error(error);
        });
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;
