'use client';
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '@/app/services/api';

const FarmerHeader = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await logout(token);
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/dashboard/login');
    };

    return (
        <header className="bg-green-800 shadow px-6 py-6 relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        src="/farmer.png"
                        alt="Farmer Logo"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <h1 className="text-xl sm:text-2xl text-blue-100 font-bold whitespace-nowrap">
                        <Typewriter
                            words={[
                                'আপনার ফসলের সেরা সার সন্ধান করুন',
                                'স্থানীয় দোকানগুলির সাথে সংযুক্ত হন',
                                'আপনার কৃষিকাজের প্রয়োজনের জন্য সেরা সার পান',
                            ]}
                            loop={0}
                            cursor
                            cursorStyle="|"
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    </h1>
                </div>
                {user && (
                    <div className="flex items-center">
                        <span className="mr-4 text-white">Welcome, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default FarmerHeader;
