'use client';
import { useState, useEffect } from 'react';
import { getShopInventory, createSale } from '@/app/services/api';
import { Plus, Trash2 } from 'lucide-react';

export const CreateSaleModal = ({ onFormSubmit, onCancel }: { onFormSubmit: () => void, onCancel: () => void }) => {
    const [inventory, setInventory] = useState<any[]>([]);
    const [items, setItems] = useState([{ fertilizer_id: '', quantity: '', unit_price: '' }]);
    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');
    const [salesperson_name, setSalespersonName] = useState('');
    const [discount_percent, setDiscountPercent] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInventory = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await getShopInventory(token);
                setInventory(response.data);
            } catch (err) {
                setError('Failed to fetch inventory.');
            }
        };
        fetchInventory();
    }, []);

    const handleItemChange = (index: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };

        if (field === 'fertilizer_id') {
            const selectedFertilizer = inventory.find(inv => inv.fertilizer.id === parseInt(value));
            if (selectedFertilizer) {
                newItems[index].unit_price = selectedFertilizer.price_per_unit;
            }
        }

        setItems(newItems);
    };

    useEffect(() => {
        const calculateTotal = () => {
            const grossTotal = items.reduce((acc, item) => {
                const quantity = parseFloat(item.quantity) || 0;
                const price = parseFloat(item.unit_price) || 0;
                return acc + (quantity * price);
            }, 0);
            const discountAmount = (grossTotal * discount_percent) / 100;
            setTotalAmount(grossTotal - discountAmount);
        };
        calculateTotal();
    }, [items, discount_percent]);

    const addItem = () => {
        setItems([...items, { fertilizer_id: '', quantity: '', unit_price: '' }]);
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
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

        const saleData = {
            customer_name,
            customer_phone,
            salesperson_name,
            discount_percent,
            items,
        };

        try {
            await createSale(saleData, token);
            onFormSubmit();
        } catch (err) {
            setError('Failed to create sale.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ maxHeight: '90vh' }}>
                <h2 className="text-3xl font-bold mb-6 text-gray-800 flex-shrink-0">Create New Sale</h2>
                <form onSubmit={handleSubmit} className="space-y-6 flex-grow overflow-y-auto">
                    {/* Customer Details */}
                    <fieldset className="border p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2">Customer Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" value={customer_name} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" className="w-full p-3 border rounded-lg" />
                            <input type="text" value={customer_phone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Customer Phone" className="w-full p-3 border rounded-lg" />
                            <input type="text" value={salesperson_name} onChange={(e) => setSalespersonName(e.target.value)} placeholder="Salesperson Name" className="w-full p-3 border rounded-lg" />
                            <div className="relative">
                                <input
                                    type="number"
                                    value={discount_percent || ''}
                                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                                    placeholder="Discount"
                                    className="w-full p-3 border rounded-lg pr-8"
                                />
                                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">%</span>
                            </div>
                        </div>
                    </fieldset>

                    {/* Sale Items */}
                    <fieldset className="border p-4 rounded-lg">
                        <legend className="text-lg font-semibold px-2">Sale Items</legend>
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-start">
                                    <div className="col-span-5">
                                <select
                                    value={item.fertilizer_id}
                                    onChange={(e) => handleItemChange(index, 'fertilizer_id', e.target.value)}
                                    className="w-full p-3 border rounded-lg"
                                >
                                    <option value="">Select Fertilizer</option>
                                    {inventory
                                        .filter(inv => !items.some(i => i.fertilizer_id === inv.fertilizer.id.toString() && i.fertilizer_id !== item.fertilizer_id))
                                        .map(inv => (
                                            <option key={inv.id} value={inv.fertilizer.id}>{inv.fertilizer.name}</option>
                                        ))}
                                </select>
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                            placeholder="Qty"
                                            className="w-full p-3 border rounded-lg"
                                        />
                                        <div className="h-4 mt-1 text-xs text-gray-500 text-center">
                                            {item.fertilizer_id &&
                                                `${inventory.find(inv => inv.fertilizer.id === parseInt(item.fertilizer_id))?.stock_quantity || 0} in stock`
                                            }
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            value={item.unit_price}
                                            onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                                            placeholder="Price"
                                            className="w-full p-3 border rounded-lg"
                                        />
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <p className="p-3 font-semibold">
                                            {(parseFloat(item.quantity) * parseFloat(item.unit_price) || 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center h-full">
                                        <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        <button type="button" onClick={addItem} className="flex items-center gap-2 text-indigo-600 font-semibold">
                            <Plus size={20} />
                            <span>Add Item</span>
                        </button>
                    </div>
                </fieldset>

                <div className="text-right text-2xl font-bold">
                    Total: {totalAmount.toFixed(2)}
                </div>

                {error && <p className="text-red-600 text-center font-medium">{error}</p>}

                <div className="flex justify-end gap-4 pt-4 flex-shrink-0">
                        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition" disabled={loading}>Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition" disabled={loading}>
                            {loading ? 'Creating Sale...' : 'Create Sale'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
