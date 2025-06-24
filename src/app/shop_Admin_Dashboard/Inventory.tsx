
'use client';


import { Package, TrendingUp, Users } from "lucide-react";
import ShopProfile from "@/app/shop_Admin_Dashboard/profile/showprofile";

import FarmerHeader from "@/app/shop_Admin_Dashboard/header";
import InventoryTabs from "@/app/shop_Admin_Dashboard/inventorytabs";

export default function InventoryPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            <FarmerHeader />

            <main className="px-6 py-6">

                <InventorySummary />
                <InventoryTabs/>

                {/* Add more sections like Fertilizer Inventory Table */}
            </main>
        </div>
    );
}


const summaryData = [
    {
        title: "মোট পণ্য",
        value: 4,
        description: "ইনভেন্টরিতে সার",
        icon: <Package className="h-5 w-5 text-gray-400" />,
        valueColor: "text-black",
    },
    {
        title: "মজুদ",
        value: 4,
        description: "পণ্য উপলব্ধ",
        icon: <TrendingUp className="h-5 w-5 text-gray-400" />,
        valueColor: "text-green-600",
    },
    {
        title: "কম মজুদ",
        value: 1,
        description: "Need restocking",
        icon: <Users className="h-5 w-5 text-gray-400" />,
        valueColor: "text-yellow-600",
    },

];

const InventorySummary = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {summaryData.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow p-5 flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <div className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</div>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div>{item.icon}</div>
                </div>
            ))}

        </div>
    );
};


