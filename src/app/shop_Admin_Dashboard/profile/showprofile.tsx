'use client';

import { useState, useRef } from 'react';
import { Pencil, Save, Upload } from 'lucide-react';

export default function ShopProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, setProfile] = useState({
        ownerName: 'Mr. Kamal Ahmed',
        shopName: 'Kamal Agro Solutions',
        contactNumber: '+8801712345678',
        memberSince: '2024-01-15',
        shopAddress: '123, Krishi Road, Farmgate, Dhaka 1215, Bangladesh',
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full mt-6 p-8 bg-white rounded-2xl shadow-md border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Shop Profile</h2>
                    <p className="text-gray-500 text-sm">View and manage your shop details</p>
                </div>
                <button
                    onClick={() => setIsEditing(prev => !prev)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                    {isEditing ? (
                        <>
                            <Save size={16} /> Save
                        </>
                    ) : (
                        <>
                            <Pencil size={16} /> Edit Profile
                        </>
                    )}
                </button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image Upload */}
                <div
                    className="relative w-36 h-36 rounded-full overflow-hidden bg-gray-100 border cursor-pointer group"
                    onClick={triggerFileSelect}
                    title="Click to upload photo"
                >
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                            📷
                        </div>
                    )}
                    {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Upload size={24} className="text-white" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={!isEditing}
                    />
                </div>

                {/* Form Section */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                            <input
                                type="text"
                                name="ownerName"
                                value={profile.ownerName}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                            <input
                                type="text"
                                name="shopName"
                                value={profile.shopName}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={profile.contactNumber}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                                    isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                                } focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Member Since</label>
                            <input
                                type="text"
                                name="memberSince"
                                value={profile.memberSince}
                                readOnly
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-200 bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shop Address</label>
                        <textarea
                            name="shopAddress"
                            value={profile.shopAddress}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full mt-1 px-4 py-2 rounded-lg border ${
                                isEditing ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                            } focus:outline-none focus:ring-2 focus:ring-green-500`}
                            rows={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
