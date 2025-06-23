'use client';

import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import LoginBox from "@/app/dashboard/login/loginbox";// ✅ fix path if needed
import SearchFilter from "@/app/component/serch_filter"; // optional

export default function Dashboard() {
    // ✅ This is a valid place to call hooks
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            {/* Header */}
            <header className="bg-green-800 shadow px-6 py-6 relative">
                <div className="flex items-center justify-center space-x-4">
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

                {/* Login Button (top right) */}
                {!showLogin && (
                    <button
                        onClick={() => setShowLogin(true)}
                        className="absolute top-4 right-6 bg-white text-green-800 px-4 py-2 rounded-md shadow hover:bg-gray-100"
                    >
                        Login
                    </button>
                )}
            </header>

            {/* Search/Filter */}
            {!showLogin && (
                <main className="p-6 flex-1">
                    <SearchFilter
                        onSearch={(q) => console.log(q)}
                        onFilter={(v) => console.log(v)}
                    />
                </main>
            )}

            {/* Show login box when toggled */}
            {showLogin && (
                <main className="p-6 flex-1">
                    <LoginBox/>
                </main>
            )}

            {/* Footer */}
            <footer className="bg-white text-center text-sm py-4 shadow-inner mt-auto">
                © 2025 All rights reserved. Sazid Hasan
            </footer>
        </div>
    );
}
