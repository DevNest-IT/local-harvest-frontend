'use client';

import React, { useState } from 'react';

interface AddProductModalProps {
    onClose: () => void;
}

export default function AddProductModal({ onClose }: AddProductModalProps) {
    const [fertilizer, setFertilizer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('In Stock');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        console.log({ fertilizer, quantity, price, status });


        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
                {/* ❌ router.back removed — only onClose() used */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl"
                >
                    ×
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mb-1">Add New Product</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Fill out the product details to update your inventory.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer</label>
                        <select
                            value={fertilizer}
                            onChange={(e) => setFertilizer(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        >
                            <option value="">Select a fertilizer</option>
                            <option value="Urea (46% Nitrogen)">Urea (46% Nitrogen)</option>
                            <option value="DAP (18-46-0)">DAP (18-46-0)</option>
                            <option value="MOP (0-0-60)">MOP (0-0-60)</option>
                            <option value="Organic Vermicompost">Organic Vermicompost</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity (kg)</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (৳/kg)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                        Add to Inventory
                    </button>
                </form>
            </div>
        </div>
    );
}
