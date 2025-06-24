'use client';

import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function InventoryTable() {
    const [products, setProducts] = useState([
        { name: 'Urea (46% Nitrogen)', quantity: 500, price: 25, status: 'In Stock', lastUpdated: '2024-01-20' },
        { name: 'DAP (18-46-0)', quantity: 75, price: 45, status: 'Low Stock', lastUpdated: '2024-01-19' },
        { name: 'MOP (0-0-60)', quantity: 400, price: 35, status: 'In Stock', lastUpdated: '2024-01-18' },
        { name: 'Organic Vermicompost', quantity: 150, price: 15, status: 'In Stock', lastUpdated: '2024-01-17' },
    ]);

    const handleChange = (index: number, field: string, value: string | number) => {
        const updated = [...products];
        // @ts-ignore
        updated[index][field] = value;
        setProducts(updated);
    };

    const handleDelete = (index: number) => {
        const updated = [...products];
        updated.splice(index, 1);
        setProducts(updated);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Fertilizer Inventory</h2>
                    <p className="text-gray-500">Manage your fertilizer stock and pricing</p>
                </div>
                <button className="cursor-pointer flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                    <Plus size={16} /> Add Product
                </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-6 text-sm text-gray-700 font-semibold border-b pb-3 mb-2 px-2">
                <div>Fertilizer</div>
                <div>Quantity (kg)</div>
                <div>Price (৳/kg)</div>
                <div>Status</div>
                <div>Last Updated</div>
                <div>Actions</div>
            </div>

            {/* Row List */}
            {products.map((product, index) => (
                <div
                    key={index}
                    className="grid grid-cols-6 items-center px-2 py-3 text-sm border-b border-gray-200 hover:bg-gray-50 transition"
                >
                <div className="font-medium text-gray-800">{product.name}</div>
                    <div>
                        <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                                handleChange(index, 'quantity', Number(e.target.value))
                            }
                            className="w-20 px-3 py-1 border rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            value={product.price}
                            onChange={(e) =>
                                handleChange(index, 'price', Number(e.target.value))
                            }
                            className="w-20 px-3 py-1 border rounded"
                        />
                    </div>
                    <div>
                        <select
                            value={product.status}
                            onChange={(e) =>
                                handleChange(index, 'status', e.target.value)
                            }
                            className="border rounded px-2 py-1"
                        >
                            <option>In Stock</option>
                            <option>Low Stock</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>
                    <div className="text-gray-500">{product.lastUpdated}</div>
                    <div>
                        <button
                            onClick={() => handleDelete(index)}
                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

    );
}


