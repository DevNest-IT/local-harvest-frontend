'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/api';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { CreateUserForm } from './components/CreateUserForm';
import { PlaceholderContent } from './components/PlaceholderContent';
import { DashboardOverview } from './components/DashboardOverview';
import { FertilizerControl } from './components/FertilizerControl';
import { ShopControl } from './components/ShopControl';

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [activeView, setActiveView] = useState('dashboard');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.role === 'admin') {
                setUser(parsedUser);
            } else {
                router.push('/dashboard/login');
            }
        } else {
            router.push('/dashboard/login');
        }
    }, [router]);

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

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardOverview />;
            case 'create-shop':
                return <CreateUserForm />;
            case 'fertilizer-control':
                return <FertilizerControl />;
            case 'shop-control':
                return <ShopControl />;
            default:
                return <DashboardOverview />;
        }
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} handleLogout={handleLogout} />
            <div className="flex-1 flex flex-col" style={{ height: '100vh' }}>
                <AdminHeader user={user} />
                <main className="flex-1 p-8 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
