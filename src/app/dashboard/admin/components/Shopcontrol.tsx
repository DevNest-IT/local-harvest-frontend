'use client';
import { useState, useEffect } from 'react';
import { getShops, toggleShopStatus } from '@/app/services/api';
import { Search } from 'lucide-react';
import { ToggleStatusModal } from './ToggleStatusModal';

export const ShopControl = () => {
    const [shops, setShops] = useState<any[]>([]);
    const [filteredShops, setFilteredShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [shopToToggle, setShopToToggle] = useState<any>(null);

    const fetchShops = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await getShops(token);
            setShops(response.data);
            setFilteredShops(response.data);
        } catch (err) {
            setError('Failed to fetch shops.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    useEffect(() => {
        let results = shops;
        if (statusFilter !== 'all') {
            results = results.filter(shop => shop.status === statusFilter);
        }
        if (searchTerm) {
            results = results.filter(shop =>
                shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shop.contact_number.includes(searchTerm)
            );
        }
        setFilteredShops(results);
    }, [searchTerm, shops, statusFilter]);

    const handleStatusToggle = (shop: any) => {
        setShopToToggle(shop);
        setShowConfirmModal(true);
    };

    const confirmStatusToggle = async (id: number, currentStatus: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            return;
        }
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            await toggleShopStatus(id, newStatus, token);
            fetchShops(); // Refetch to get the updated list
        } catch (err) {
            setError('Failed to toggle shop status.');
        } finally {
            setShowConfirmModal(false);
            setShopToToggle(null);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Shop Control</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {['all', 'active', 'inactive'].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${statusFilter === status ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 p-2 border rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {loading && <p>Loading shops...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4">
                {filteredShops.map(shop => (
                    <div key={shop.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src={shop.owner_picture_url} alt={shop.shop_name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold">{shop.shop_name}</h3>
                                <p className="text-sm text-gray-600">{shop.user.name} - {shop.contact_number}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleStatusToggle(shop)}
                                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${shop.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${shop.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {showConfirmModal && shopToToggle && (
                <ToggleStatusModal
                    shopName={shopToToggle.shop_name}
                    currentStatus={shopToToggle.status}
                    onConfirm={() => confirmStatusToggle(shopToToggle.id, shopToToggle.status)}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
        </div>
    );
};
