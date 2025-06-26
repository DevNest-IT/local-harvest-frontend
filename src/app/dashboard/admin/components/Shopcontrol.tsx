'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

const suggestions = [
    'Receive notifications',
    'Allow profile visibility',
    'Enable location',
    'Accept terms and conditions'
];

// Hardcoded profile data (you can replace with props or API data)
const profile = {
    name: 'Kamal Uddin',
    phone: '+880 1234-567890',
    image: '/profile.png' // make sure this image exists in /public
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
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    const confirmToggle = () => {
        if (checkedItems.length === 0) return;
        setIsActive(!isActive);
        setShowModal(false);
        setCheckedItems([]); // reset
    };

    return (
        <div className="grid grid-rows-2 gap-4 max-w-md mx-auto mt-10">
            {/* Top Section: Image + Name + Phone */}
            <div className="p-6 border rounded-xl shadow-md space-y-4 text-center">
                <div className="flex justify-center">
                    <Image
                        src={profile.image}
                        alt="Profile"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
                    <p className="text-gray-600">{profile.phone}</p>
                </div>
            </div>

            {/* Bottom Section: Toggle Button */}
            <div className="p-6 border rounded-xl shadow-md flex items-center justify-between">
        <span className="text-gray-700 font-semibold">
          {isActive ? 'Active' : 'Deactive'}
        </span>
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

            {/* Modal Dialog */}
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-white p-6 rounded shadow-md w-80">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            Confirm Change
                        </Dialog.Title>
                        <div className="space-y-2 mb-4">
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
