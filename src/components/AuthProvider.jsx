import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:4000/me', {
                    method: 'GET',
                    credentials: 'include'
                });

                if(!res.ok) {
                    throw new Error();
                }

                const data = await res.json();
                login(data.user);
                setIsLogged(true);
            } catch(err) {
                setIsLogged(false);
                setUser(null);
            };
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout, isLogged, setIsLogged}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;