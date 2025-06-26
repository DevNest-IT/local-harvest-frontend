'use client';
import { useState, useEffect } from 'react';
import { addShopInventory, updateShopInventory, getShopInventoryItem } from '@/app/services/api';

export const AddProductModal = ({ availableFertilizers, inventoryId, onFormSubmit, onCancel }: { availableFertilizers: any[], inventoryId?: number, onFormSubmit: () => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({
        fertilizer_id: '',
        stock_quantity: '',
        price_per_unit: '',
        stock_status: 'in_stock',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (inventoryId) {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                setLoading(false);
                return;
            }
            getShopInventoryItem(inventoryId, token)
                .then(response => {
                    const { fertilizer_id, stock_quantity, price_per_unit, stock_status } = response.data;
                    setFormData({ fertilizer_id, stock_quantity, price_per_unit, stock_status });
                })
                .catch(() => setError('Failed to fetch inventory item details.'))
                .finally(() => setLoading(false));
        }
    }, [inventoryId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }

        try {
            if (inventoryId) {
                await updateShopInventory(inventoryId, formData, token);
            } else {
                await addShopInventory(formData, token);
            }
            onFormSubmit();
        } catch (err) {
            setError('Failed to save inventory item.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{inventoryId ? 'Edit' : 'Add'} Product to Inventory</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select name="fertilizer_id" value={formData.fertilizer_id} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" disabled={!!inventoryId}>
                        <option value="">Select a fertilizer</option>
                        {availableFertilizers.map(f => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                    </select>
                    <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="Stock Quantity" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    <input type="number" name="price_per_unit" value={formData.price_per_unit} onChange={handleChange} placeholder="Price Per Unit" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    <select name="stock_status" value={formData.stock_status} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                    
                    {error && <p className="text-red-600 text-center font-medium">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition" disabled={loading}>Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
