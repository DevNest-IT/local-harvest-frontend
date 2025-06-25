'use client';
import { useState, useEffect } from 'react';
import { addFertilizer, updateFertilizer, getFertilizerDetails } from '@/app/services/api';

export const AddEditFertilizerForm = ({ fertilizerId, onFormSubmit, onCancel }: { fertilizerId?: number, onFormSubmit: () => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        npk_ratio: '',
        category: '',
        application_guide: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (fertilizerId) {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found.');
                setLoading(false);
                return;
            }
            getFertilizerDetails(fertilizerId, token)
                .then(response => {
                    const { name, description, npk_ratio, category, application_guide } = response.data;
                    setFormData({ name, description, npk_ratio, category, application_guide });
                })
                .catch(() => setError('Failed to fetch fertilizer details.'))
                .finally(() => setLoading(false));
        }
    }, [fertilizerId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
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

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (image) {
            data.append('image', image);
        }

        try {
            if (fertilizerId) {
                await updateFertilizer(fertilizerId, data, token);
            } else {
                await addFertilizer(data, token);
            }
            onFormSubmit();
        } catch (err) {
            setError('Failed to save fertilizer.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && fertilizerId) {
        return <p>Loading form...</p>;
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{fertilizerId ? 'Edit' : 'Add'} Fertilizer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="npk_ratio" value={formData.npk_ratio} onChange={handleChange} placeholder="NPK Ratio" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <textarea name="application_guide" value={formData.application_guide} onChange={handleChange} placeholder="Application Guide" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                <input type="file" name="image" onChange={handleImageChange} className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                
                {error && <p className="text-red-600 text-center font-medium">{error}</p>}

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition" disabled={loading}>Cancel</button>
                    <button type="submit" className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};
