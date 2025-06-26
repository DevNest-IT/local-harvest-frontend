'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InventoryPage from "@/app/dashboard/shop/Inventory";

export default function ShopAdminDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role === 'shop_owner') {
                setUser(parsedUser);
            } else if (parsedUser.role === 'admin') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/login');
            }
        } else {
            router.push('/dashboard/login');
        }
    }, [router]);

    const handleProfileUpdate = () => {
        const updatedUser = { ...user, hasProfileSetup: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen text-gray-800">
            <InventoryPage hasProfileSetup={user.hasProfileSetup} onProfileUpdate={handleProfileUpdate} />
            <footer className="bg-white text-center text-sm py-4 shadow-inner mt-auto">
                © 2025 All rights reserved.
            </footer>
        </div>
    );
}
