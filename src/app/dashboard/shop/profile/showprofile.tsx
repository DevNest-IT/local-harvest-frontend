'use client';
import { useState, useEffect, useRef } from 'react';
import { getShopProfile, setupShopProfile, editShopProfile } from '@/app/services/api';
import { Camera, Edit, Save } from 'lucide-react';

interface ShopProfileProps {
    onProfileUpdate: () => void;
}

const ProfileSkeleton = () => (
    <div className="w-full mt-6 p-8 bg-white rounded-2xl shadow-md border border-gray-200 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-36 h-36 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    </div>
);

export default function ShopProfile({ onProfileUpdate }: ShopProfileProps) {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        shop_name: '',
        contact_number: '',
        address: '',
    });
    const [owner_picture, setOwnerPicture] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication required.');
            setLoading(false);
            return;
        }
        try {
            const response = await getShopProfile(token);
            setProfile(response.data);
            setFormData({
                shop_name: response.data.shop_name,
                contact_number: response.data.contact_number,
                address: response.data.address,
            });
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                setIsEditing(true); // Force edit mode if profile not set
            } else {
                setError('Failed to fetch profile.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setOwnerPicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication required.');
            setLoading(false);
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (owner_picture) {
            data.append('owner_picture', owner_picture);
        }

        try {
            if (profile) {
                await editShopProfile(data, token);
            } else {
                await setupShopProfile(data, token);
            }
            setIsEditing(false);
            fetchProfile(); // Refetch to show updated data
            onProfileUpdate();
        } catch (err) {
            setError('Failed to save profile.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ProfileSkeleton />;
    if (error && !isEditing) return <p className="text-red-500">{error}</p>;

    return (
        <div className="w-full mt-6 p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                    {profile ? 'Shop Profile' : 'Setup Your Shop Profile'}
                </h2>
                {profile && (
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        {isEditing ? <Save size={16} /> : <Edit size={16} />}
                        <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="relative w-36 h-36">
                        <img
                            src={owner_picture ? URL.createObjectURL(owner_picture) : profile?.owner_picture_url || '/farmer.png'}
                            alt="Profile"
                            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
                            >
                                <Camera size={16} />
                            </button>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={!isEditing}
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <input
                            type="text"
                            name="shop_name"
                            value={formData.shop_name}
                            onChange={handleChange}
                            placeholder="Shop Name"
                            className="w-full p-3 border rounded-lg"
                            readOnly={!!profile}
                        />
                        <input
                            type="text"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            className="w-full p-3 border rounded-lg"
                            readOnly={!isEditing}
                        />
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Shop Address"
                            className="w-full p-3 border rounded-lg"
                            rows={3}
                            readOnly={!isEditing}
                        />
                        {profile && (
                            <p className="text-sm text-gray-500">
                                Shop Serial: {profile.shop_serial_number} | Status: {profile.status}
                            </p>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                            disabled={loading}
                        >
                            <Save size={16} />
                            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
