'use client';

import React, { useState, useEffect } from "react";
import ShopProfile from "./profile/showprofile";
import InventoryManagementPage from "@/app/dashboard/shop/inventorymanagemant/inventory-management";

const InventoryTabs = ({ hasProfileSetup, onProfileUpdate, onInventoryUpdate }: { hasProfileSetup: boolean, onProfileUpdate: () => void, onInventoryUpdate: () => void }) => {
    const [activeTab, setActiveTab] = useState(hasProfileSetup ? "inventory" : "shop");

    useEffect(() => {
        if (!hasProfileSetup) {
            setActiveTab("shop");
        }
    }, [hasProfileSetup]);

    return (
        <div className="p-6">
            {!hasProfileSetup && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold">Welcome!</p>
                    <p>Please set up your shop profile to get started.</p>
                </div>
            )}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-md mb-6 w-fit">
                <button
                    className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
                        activeTab === "inventory"
                            ? "bg-white text-black shadow"
                            : "text-gray-500"
                    } ${!hasProfileSetup && 'cursor-not-allowed opacity-50'}`}
                    onClick={() => hasProfileSetup && setActiveTab("inventory")}
                    disabled={!hasProfileSetup}
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
                {activeTab === "inventory" && hasProfileSetup && (
                    <div className="mt-4">
                        <InventoryManagementPage onInventoryUpdate={onInventoryUpdate} />
                    </div>
                )}

                {activeTab === "shop" && (
                    <div className="mt-4">
                        <ShopProfile onProfileUpdate={onProfileUpdate} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryTabs;
