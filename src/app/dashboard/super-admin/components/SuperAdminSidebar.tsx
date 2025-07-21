'use client';
import { UserPlus, SlidersHorizontal, LogOut, LayoutDashboard, Store, FileText } from 'lucide-react';
import Link from "next/link";

interface SuperAdminSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    handleLogout: () => void;
}

export const SuperAdminSidebar = ({ activeView, setActiveView, handleLogout }: SuperAdminSidebarProps) => {
    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                Super Admin Panel
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
                    onClick={() => setActiveView('create-admin')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'create-admin' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <UserPlus size={20} />
                    <span>Create Admin</span>
                </button>
                <button
                    onClick={() => setActiveView('admin-control')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'admin-control' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <Store size={20} />
                    <span>Admin Control</span>
                </button>
                <button
                    onClick={() => setActiveView('reports')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${activeView === 'reports' ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
                >
                    <FileText size={20} />
                    <span>Reports</span>
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
