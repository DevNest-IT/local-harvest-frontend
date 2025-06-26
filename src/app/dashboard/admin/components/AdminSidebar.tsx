'use client';
import { UserPlus, SlidersHorizontal, LogOut, LayoutDashboard } from 'lucide-react';

import Link from "next/link";
interface AdminSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    handleLogout: () => void;
}

export const AdminSidebar = ({ activeView, setActiveView, handleLogout }: AdminSidebarProps) => {
    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                Admin Panel
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => setActiveView('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'dashboard' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </button>
                <button
                    onClick={() => setActiveView('create-shop')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'create-shop' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <UserPlus size={20} />
                    <span>Create Shop</span>
                </button>
                <button
                    onClick={() => setActiveView('fertilizer-control')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'fertilizer-control' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <SlidersHorizontal size={20} />
                    <span>Fertilizer Control</span>
                </button>
                <button
                    onClick={() => setActiveView('fertilizer-control')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'fertilizer-control' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <SlidersHorizontal size={20} />
                    <Link href="/dashboard/admin/components/Shopcontrol">Shop Control</Link>
                </button>
            </nav>
            <div className="p-4 border-t border-slate-700">
                 <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition hover:bg-slate-700"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};
