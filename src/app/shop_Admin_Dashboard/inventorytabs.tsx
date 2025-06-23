// components/InventoryTabs.tsx

import React, { useState } from "react";
import Link from "next/link";

const InventoryTabs = () => {
    const [activeTab, setActiveTab] = useState("inventory");

    return (
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
              <Link href="/shop_Admin_Dashboard/profile">Shop Profile</Link>

            </button>
        </div>
    );
};

export default InventoryTabs;
