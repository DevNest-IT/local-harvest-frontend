'use client';
import { useEffect, useState } from 'react';
import { getDashboardSummary } from '@/app/services/api';
import { Users, Store, Package, Eye } from 'lucide-react';
import { VisitorGraph } from './VisitorGraph';

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-6">
        <div className="bg-indigo-100 p-4 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export const DashboardOverview = () => {
    const [summary, setSummary] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSummary = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                return;
            }
            try {
                const response = await getDashboardSummary(token);
                setSummary(response.data);
            } catch (err) {
                setError('Failed to fetch dashboard summary.');
            }
        };
        fetchSummary();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!summary) {
        return <div>Loading...</div>;
    }

    const stats = [
        { title: 'Total Shop Owners', value: summary.total_shop_owners, icon: <Users className="text-indigo-500" size={28}/> },
        { title: 'Active Shops', value: summary.active_shops, icon: <Store className="text-indigo-500" size={28}/> },
        { title: 'Total Fertilizers', value: summary.total_fertilizers, icon: <Package className="text-indigo-500" size={28}/> },
        { title: 'Total Visitors', value: summary.total_visitors, icon: <Eye className="text-indigo-500" size={28}/> },
    ];

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map(stat => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>
            <VisitorGraph />
        </div>
    );
};
