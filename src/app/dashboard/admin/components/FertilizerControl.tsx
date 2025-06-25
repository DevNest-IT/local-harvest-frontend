'use client';
import { useState, useEffect } from 'react';
import { getFertilizers, deleteFertilizer } from '@/app/services/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AddEditFertilizerForm } from './AddEditFertilizerForm';


export const FertilizerControl = () => {
    const [fertilizers, setFertilizers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedFertilizerId, setSelectedFertilizerId] = useState<number | undefined>(undefined);

    const fetchFertilizers = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await getFertilizers(token);
            setFertilizers(response.data);
        } catch (err) {
            setError('Failed to fetch fertilizers.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFertilizers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this fertilizer?')) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            return;
        }
        try {
            await deleteFertilizer(id, token);
            fetchFertilizers(); // Refetch after delete
        } catch (err) {
            setError('Failed to delete fertilizer.');
        }
    };
    
    const handleEdit = (id: number) => {
        setSelectedFertilizerId(id);
        setShowForm(true);
    };

    const handleAdd = () => {
        setSelectedFertilizerId(undefined);
        setShowForm(true);
    };
    
    const handleFormSubmit = () => {
        setShowForm(false);
        fetchFertilizers();
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Fertilizer Control</h2>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus size={20} />
                    <span>Add Fertilizer</span>
                </button>
            </div>

            {loading && <p>Loading fertilizers...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4">
                {fertilizers.map(f => (
                    <div key={f.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{f.name}</h3>
                            <p className="text-sm text-gray-600">{f.category}</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => handleEdit(f.id)} className="text-gray-500 hover:text-indigo-600">
                                <Edit size={20} />
                            </button>
                            <button onClick={() => handleDelete(f.id)} className="text-gray-500 hover:text-red-600">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
                    <AddEditFertilizerForm
                        fertilizerId={selectedFertilizerId}
                        onFormSubmit={handleFormSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}
        </div>
    );
};
