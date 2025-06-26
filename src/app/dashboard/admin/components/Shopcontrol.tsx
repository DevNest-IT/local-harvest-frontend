'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { CheckCircle, XCircle } from 'lucide-react';

const suggestions = [
    'Receive notifications',
    'Allow profile visibility',
    'Enable location',
    'Accept terms and conditions'
];

const profile = {
    name: 'Kamal Uddin',
    phone: '+880 1234-567890',
    image: '/profile.png'
};

export default function ProfileToggle() {
    const [isActive, setIsActive] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const handleToggle = () => {
        setShowModal(true);
    };

    const handleCheckboxChange = (item: string) => {
        setCheckedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const confirmToggle = () => {
        if (checkedItems.length === 0) return;
        setIsActive(!isActive);
        setShowModal(false);
        setCheckedItems([]);
    };

    return (
        <div className="w-full px-6 py-4 border rounded-xl shadow-md bg-white">
            <div className="flex items-center justify-between w-full gap-4">
                {/* 1. Profile Image */}
                <div className="flex-shrink-0">
                    <Image
                        src={profile.image}
                        alt="Profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                </div>

                {/* 2. Name + Phone vertically */}
                <div className="flex flex-col text-sm text-left">
                    <span className="font-medium text-gray-800">{profile.name}</span>
                    <span className="text-gray-600">{profile.phone}</span>
                </div>

                {/* 3. Status */}
                <div className={`font-semibold text-sm ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {isActive ? 'Active' : 'Deactive'}
                </div>

                {/* 4. Toggle Button aligned right */}
                <div className="ml-auto">
                    <button
                        onClick={handleToggle}
                        className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
                            isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                                isActive ? 'translate-x-7' : ''
                            }`}
                        ></div>
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-white p-6 rounded shadow-md w-80">
                        <Dialog.Title className="text-lg font-bold mb-2 flex items-center gap-2">
                            {isActive ? (
                                <>
                                    <CheckCircle className="text-green-600 w-5 h-5" />
                                    <span>Currently Active. Deactivate?</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="text-red-600 w-5 h-5" />
                                    <span>Currently Deactive. Activate?</span>
                                </>
                            )}
                        </Dialog.Title>

                        <p className="text-sm text-gray-600 mb-4">
                            Please select at least one option to continue.
                        </p>

                        <div className="space-y-2 mb-4 text-left">
                            {suggestions.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index}`}
                                        checked={checkedItems.includes(item)}
                                        onChange={() => handleCheckboxChange(item)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`checkbox-${index}`}>{item}</label>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-600 hover:text-black"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmToggle}
                                className={`px-4 py-1 rounded ${
                                    checkedItems.length > 0 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                                disabled={checkedItems.length === 0}
                            >
                                Confirm
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
