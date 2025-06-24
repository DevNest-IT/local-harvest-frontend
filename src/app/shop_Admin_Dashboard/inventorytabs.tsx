'use client';

import React, { useState } from "react";
import ShopProfile from "./profile/showprofile";
import InventoryManagementPage from "@/app/shop_Admin_Dashboard/profile/inventoru-management";
 // Adjust the path if needed

const InventoryTabs = () => {
    const [activeTab, setActiveTab] = useState("inventory");

    return (
        <div className="p-6">
            {/* Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-md mb-6 w-fit">
                <button
                    className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
                        activeTab === "inventory"
                            ? "bg-white text-black shadow"
                            : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("inventory")}
                >
                    Inventory Management
                </button>
                <button
                    className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
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
                    <div className="mt-4">
                        <InventoryManagementPage/>
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
