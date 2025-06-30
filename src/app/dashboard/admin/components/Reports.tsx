'use client';
import { useState, useEffect } from 'react';
import { getFertilizerStockSummary } from '@/app/services/api';

export const Reports = () => {
    const [summary, setSummary] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSummary = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await getFertilizerStockSummary(token);
                setSummary(response.data);
            } catch (err) {
                setError('Failed to fetch summary.');
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fertilizer Stock Summary</h2>
            {loading && <p>Loading summary...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="p-4">Fertilizer</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Total Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-4">{item.name}</td>
                            <td className="p-4">{item.category}</td>
                            <td className="p-4">{item.total_stock} KG</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
