'use client';
import { useState, useEffect } from 'react';
import { getShopInventory, deleteShopInventory, getPlatformFertilizers } from '@/app/services/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AddProductModal } from '../add-product/add-product-modal';
import { ConfirmationModal } from '../components/ConfirmationModal';

export default function InventoryManagementPage({ onInventoryUpdate }: { onInventoryUpdate: () => void }) {
    const [inventory, setInventory] = useState<any[]>([]);
    const [platformFertilizers, setPlatformFertilizers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedInventoryId, setSelectedInventoryId] = useState<number | undefined>(undefined);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const [inventoryRes, platformFertilizersRes] = await Promise.all([
                getShopInventory(token),
                getPlatformFertilizers(),
            ]);
            setInventory(inventoryRes.data);
            setPlatformFertilizers(platformFertilizersRes.data);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id: number) => {
        setItemToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete === null) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            return;
        }
        try {
            await deleteShopInventory(itemToDelete, token);
            fetchData(); // Refetch after delete
            onInventoryUpdate();
        } catch (err) {
            setError('Failed to delete item.');
        } finally {
            setShowDeleteConfirm(false);
            setItemToDelete(null);
        }
    };
    
    const handleEdit = (id: number) => {
        setSelectedInventoryId(id);
        setShowForm(true);
    };

    const handleAdd = () => {
        setSelectedInventoryId(undefined);
        setShowForm(true);
    };
    
    const handleFormSubmit = () => {
        setShowForm(false);
        fetchData();
        onInventoryUpdate();
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus size={20} />
                    <span>Add Product</span>
                </button>
            </div>

            {loading && <p>Loading inventory...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4">
                {inventory.map(item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{item.fertilizer.name}</h3>
                            <p className="text-sm text-gray-600">
                                Stock: {item.stock_quantity} | Price: {item.price_per_unit} | Status: {item.stock_status}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => handleEdit(item.id)} className="text-gray-500 hover:text-indigo-600">
                                <Edit size={20} />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-600">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-50">
                    <AddProductModal
                        availableFertilizers={platformFertilizers.filter(
                            pf => !inventory.some(inv => inv.fertilizer_id === pf.id)
                        )}
                        inventoryId={selectedInventoryId}
                        onFormSubmit={handleFormSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

            {showDeleteConfirm && (
                <ConfirmationModal
                    title="Delete Item"
                    message="Are you sure you want to delete this item from your inventory?"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </div>
    );
};
