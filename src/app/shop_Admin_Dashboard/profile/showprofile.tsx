'use client';

import { useState } from 'react';

export default function ShopProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        ownerName: 'Mr. Kamal Ahmed',
        shopName: 'Kamal Agro Solutions',
        contactNumber: '+8801712345678',
        memberSince: '2024-01-15',
        shopAddress: '123, Krishi Road, Farmgate, Dhaka 1215, Bangladesh',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Shop Profile</h2>
                    <p className="text-gray-500">Manage your shop information and contact details</p>
                </div>
                <button
                    onClick={() => setIsEditing(prev => !prev)}
                    className="border px-4 py-2 rounded-md hover:bg-gray-100"
                >
                    {isEditing ? 'Save' : 'Edit Profile'}
                </button>
            </div>

            {/* Profile Info */}
            <div className="flex gap-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 border flex items-center justify-center text-gray-400">
                    📷
                </div>

                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">Owner Name</label>
                            <input
                                type="text"
                                name="ownerName"
                                value={profile.ownerName}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Shop Name</label>
                            <input
                                type="text"
                                name="shopName"
                                value={profile.shopName}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={profile.contactNumber}
                                onChange={handleChange}
                                readOnly={!isEditing}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Member Since</label>
                            <input
                                type="text"
                                name="memberSince"
                                value={profile.memberSince}
                                readOnly
                                className="w-full border rounded px-3 py-2 bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Shop Address</label>
                        <textarea
                            name="shopAddress"
                            value={profile.shopAddress}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className="w-full border rounded px-3 py-2"
                            rows={2}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
