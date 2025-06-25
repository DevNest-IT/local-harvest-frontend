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

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleAddProduct = (product: { name: string; quantity: number; price: number; status: string }) => {
        const today = new Date().toISOString().split('T')[0];
        setProducts((prev) => [...prev, { ...product, lastUpdated: today }]);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-lg">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-1">Add New Product to Inventory</h2>
                        <p className="text-sm text-gray-500 mb-4">Select a fertilizer and fill in the details.</p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const fertilizer = (form.elements.namedItem('fertilizer') as HTMLSelectElement).value;
                                const quantity = Number((form.elements.namedItem('quantity') as HTMLInputElement).value);
                                const price = Number((form.elements.namedItem('price') as HTMLInputElement).value);
                                const status = (form.elements.namedItem('status') as HTMLSelectElement).value;

                                handleAddProduct({ name: fertilizer, quantity, price, status });
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block mb-1 text-sm font-medium">Fertilizer</label>
                                <select name="fertilizer" required className="w-full border px-3 py-2 rounded">
                                    <option value="">Select a fertilizer</option>
                                    <option value="Urea (46% Nitrogen)">Urea (46% Nitrogen)</option>
                                    <option value="DAP (18-46-0)">DAP (18-46-0)</option>
                                    <option value="MOP (0-0-60)">MOP (0-0-60)</option>
                                    <option value="Organic Vermicompost">Organic Vermicompost</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Quantity (kg)</label>
                                <input type="number" name="quantity" required className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Price (৳/kg)</label>
                                <input type="number" name="price" required className="w-full border px-3 py-2 rounded" />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Stock Status</label>
                                <select name="status" className="w-full border px-3 py-2 rounded">
                                    <option value="In Stock">In Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                                Add to Inventory
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Main Inventory Table */}
            <div className={`${isModalOpen ? 'opacity-30 blur-sm pointer-events-none' : ''} transition-all`}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Fertilizer Inventory</h2>
                            <p className="text-gray-500">Manage your fertilizer stock and pricing</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                        >
                            <Plus size={16} />
                            Add Product
                        </button>
                    </div>

                    <div className="grid grid-cols-6 text-sm text-gray-700 font-semibold border-b pb-3 mb-2 px-2">
                        <div>Fertilizer</div>
                        <div>Quantity (kg)</div>
                        <div>Price (৳/kg)</div>
                        <div>Status</div>
                        <div>Last Updated</div>
                        <div>Actions</div>
                    </div>

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
                                    onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
                                    className="w-20 px-3 py-1 border rounded"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => handleChange(index, 'price', Number(e.target.value))}
                                    className="w-20 px-3 py-1 border rounded"
                                />
                            </div>
                            <div>
                                <select
                                    value={product.status}
                                    onChange={(e) => handleChange(index, 'status', e.target.value)}
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
            </div>
        </>
    );
}
