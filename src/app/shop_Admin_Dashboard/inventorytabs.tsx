'use client';

import React, { useState } from "react";
import ShopProfile from "./profile/showprofile";
 // Adjust the path if needed

const InventoryTabs = () => {
    const [activeTab, setActiveTab] = useState("inventory");

    return (
        <div className="p-6">
            {/* Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-md mb-6 w-fit">
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                        activeTab === "inventory"
                            ? "bg-white text-black shadow"
                            : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("inventory")}
                >
                    Inventory Management
                </button>
                <button
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                        activeTab === "shop"
                            ? "bg-white text-black shadow"
                            : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("shop")}
                >
                    Shop Profile
                </button>
            </div>

            <div>
                {activeTab === "inventory" && (
                    <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
                        <h2 className="text-xl font-semibold mb-2">Inventory Management</h2>
                        <p className="text-gray-600">Manage your inventory details here.</p>
                        {/* You can add your own inventory management UI here */}
                    </div>
                )}

                {activeTab === "shop" && (
                    <div className="mt-4">
                        <ShopProfile />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryTabs;
