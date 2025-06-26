
'use client';


import { Package, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { getShopDashboardSummary } from "@/app/services/api";
import FarmerHeader from "@/app/dashboard/shop/header";
import InventoryTabs from "@/app/dashboard/shop/inventorytabs";

const InventorySummary = ({ summary }: { summary: any }) => {
    const summaryData = [
        {
            title: "Total Products",
            value: summary.total_products,
            icon: <Package className="h-5 w-5 text-gray-400" />,
        },
        {
            title: "In Stock",
            value: summary.in_stock,
            icon: <TrendingUp className="h-5 w-5 text-gray-400" />,
        },
        {
            title: "Low Stock",
            value: summary.low_stock,
            icon: <Users className="h-5 w-5 text-gray-400" />,
        },
        {
            title: "Shop Status",
            value: summary.shop_status,
            icon: <ShieldCheck className="h-5 w-5 text-gray-400" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {summaryData.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow p-5 flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <div className={`text-2xl font-bold`}>{item.value}</div>
                    </div>
                    <div>{item.icon}</div>
                </div>
            ))}
        </div>
    );
};

export default function InventoryPage({ hasProfileSetup, onProfileUpdate }: { hasProfileSetup: boolean, onProfileUpdate: () => void }) {
    const [summary, setSummary] = useState<any>(null);
    const [error, setError] = useState('');

    const fetchSummary = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            return;
        }
        try {
            const response = await getShopDashboardSummary(token);
            setSummary(response.data);
        } catch (err) {
            setError('Failed to fetch summary.');
        }
    };

    useEffect(() => {
        if (hasProfileSetup) {
            fetchSummary();
        }
    }, [hasProfileSetup]);

    const handleInventoryUpdate = () => {
        fetchSummary();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            <FarmerHeader />

            <main className="px-6 py-6">
                {hasProfileSetup && summary && <InventorySummary summary={summary} />}
                <InventoryTabs hasProfileSetup={hasProfileSetup} onProfileUpdate={onProfileUpdate} onInventoryUpdate={handleInventoryUpdate} />
            </main>
        </div>
    );
}
