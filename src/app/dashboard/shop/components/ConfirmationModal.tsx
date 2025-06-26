'use client';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationModal = ({ title, message, onConfirm, onCancel }: ConfirmationModalProps) => {
    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex items-start">
                    <div className="mr-4 bg-red-100 p-3 rounded-full">
                        <AlertTriangle className="text-red-600" size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <p className="mt-2 text-gray-600">{message}</p>
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
                        className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
