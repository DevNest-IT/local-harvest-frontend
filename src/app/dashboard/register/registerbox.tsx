'use client';

import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import LoginBox from "@/app/dashboard/login/loginbox";

export default function RegisterBox() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = () => {
        if (!name || !email || !password || !confirm) {
            alert('সব তথ্য পূরণ করুন');
            return;
        }

        if (password !== confirm) {
            alert('পাসওয়ার্ড মিলে না');
            return;
        }

        // Simulate registration
        console.log({ name, email, password });
        setSuccess(true);

        // Hide animation after 2.5s
        setTimeout(() => {
            setSuccess(false);
            // Redirect or clear fields if you want
        }, 2500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                {/* ✅ Success Animation */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 flex flex-col justify-center items-center bg-white/90 z-10 rounded-xl"
                        >
                            <CheckCircleIcon className="w-16 h-16 text-green-600 animate-ping-once" />
                            <p className="mt-4 text-xl font-bold text-green-700">Registration Successful!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Create a New Account</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold"
                >
                    Register
                </button>

                {/* Switch to Login */}
                <div className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link href="/loginbox" className="text-green-700 underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
