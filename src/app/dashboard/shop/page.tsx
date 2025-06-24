'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InventoryPage from "@/app/dashboard/shop/Inventory";

export default function ShopAdminDashboardPage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === 'shop_owner') {
                setIsAuthorized(true);
            } else if (user.role === 'admin') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/login');
            }
        } else {
            router.push('/dashboard/login');
        }
    }, [router]);

    if (!isAuthorized) {
        return null; // or a loading spinner
    }

    return (
        <div className="flex flex-col min-h-screen text-gray-800">
            <InventoryPage />

            <footer className="bg-white text-center text-sm py-4 shadow-inner mt-auto">
                © 2025 All rights reserved.
            </footer>
        </div>
    );
}
