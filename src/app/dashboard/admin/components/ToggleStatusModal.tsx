'use client';
import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ToggleStatusModalProps {
    shopName: string;
    currentStatus: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ToggleStatusModal = ({ shopName, currentStatus, onConfirm, onCancel }: ToggleStatusModalProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const isActivating = currentStatus === 'inactive';

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-start">
                    <div className={`mr-4 p-3 rounded-full ${isActivating ? 'bg-green-100' : 'bg-red-100'}`}>
                        <AlertTriangle className={isActivating ? 'text-green-600' : 'text-red-600'} size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">Confirm Status Change</h3>
                        <p className="mt-2 text-gray-600">
                            {isActivating
                                ? `If you activate ${shopName}, their inventory will become visible to the public, and they will be able to update their inventory and make sales.`
                                : `If you deactivate ${shopName}, their inventory will not be visible to the public, and they will not be able to update their inventory or make any sales.`
                            }
                        </p>
                        <div className="mt-4 flex items-center">
                            <input
                                type="checkbox"
                                id="confirm-checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label htmlFor="confirm-checkbox" className="ml-2 text-sm text-gray-600">
                                I understand the consequences.
                            </label>
                        </div>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-2 rounded-lg text-white font-semibold transition disabled:opacity-50 ${isActivating ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                        disabled={!isChecked}
                    >
                        {isActivating ? 'Activate' : 'Deactivate'}
                    </button>
                </div>
            </div>
        </div>
    );
};
