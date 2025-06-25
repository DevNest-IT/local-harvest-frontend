'use client';

export const PlaceholderContent = ({ title }: { title: string }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl flex items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-gray-400">{title} - Coming Soon</h2>
    </div>
);
