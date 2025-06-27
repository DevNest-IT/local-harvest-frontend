'use client';
import { useState, useEffect } from 'react';
import { getFertilizerWithShops } from '@/app/services/api';
import { X, Phone, MapPin } from 'lucide-react';

export const FertilizerDetailsModal = ({ fertilizerId, onCancel }: { fertilizerId: number, onCancel: () => void }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFertilizerWithShops(fertilizerId);
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch details.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fertilizerId]);

    const getStockColor = (status: string) => {
        switch (status) {
            case 'in_stock': return 'bg-green-100 text-green-800';
            case 'low_stock': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-red-100 text-red-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {data && (
                    <>
                        <div className="flex justify-between items-start mb-6 flex-shrink-0">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">{data.fertilizer.name}</h2>
                                <p className="text-gray-500">{data.fertilizer.description}</p>
                            </div>
                            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Side */}
                                <div>
                                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <img src={data.fertilizer.image_url} alt={data.fertilizer.name} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className="mt-6 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold">NPK Ratio:</span>
                                            <span>{data.fertilizer.npk_ratio}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Category:</span>
                                            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{data.fertilizer.category}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Application Guide</h3>
                                            <p className="text-gray-600">{data.fertilizer.application_guide}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Available at Local Shops</h3>
                                    <div className="space-y-4" style={{ maxHeight: 'calc(90vh - 400px)', overflowY: 'auto' }}>
                                        {data.shops.map((shop: any) => (
                                            <div key={shop.shop_name} className="bg-white rounded-lg shadow-md p-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-lg">{shop.shop_name}</h4>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockColor(shop.stock_status)}`}>
                                                        {shop.stock_status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-2"><MapPin size={12} /> {shop.address}</p>
                                                <a href={`tel:${shop.contact_number}`} className="text-sm text-blue-600 flex items-center gap-1 mt-1"><Phone size={12} /> {shop.contact_number}</a>
                                                <div className="flex justify-between items-center mt-2">
                                                    <p className="text-lg font-bold">৳{shop.price_per_unit}/kg</p>
                                                    <p className="text-sm text-gray-500">{shop.stock_quantity} kg available</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
