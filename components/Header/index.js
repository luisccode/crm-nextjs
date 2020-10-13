import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userData')));
    }, []);

    if (!user || Object.keys(user).length === 0) return null;

    const handleClick = () => {
        localStorage.setItem('isAuth', 'false');
        localStorage.setItem('userData', '{}');
        router.push('/login');
    };
    return (
        <header className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {user.name}</p>

            <button
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                onClick={handleClick}
            >
                Log out
            </button>
        </header>
    );
};

export default Header;
