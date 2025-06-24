import InventoryPage from "@/app/dashboard/shop/Inventory";

export default function ShopAdminDashboardPage() {
    return (
        <div className="flex flex-col min-h-screen text-gray-800">
            <InventoryPage />

            <footer className="bg-white text-center text-sm py-4 shadow-inner mt-auto">
                © 2025 All rights reserved.
            </footer>
        </div>
    );
}
