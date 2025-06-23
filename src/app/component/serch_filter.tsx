'use client';

import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface SearchFilterProps {
    onSearch: (query: string) => void;
    onFilter: (value: string) => void;
}

export default function SearchFilter({ onSearch, onFilter }: SearchFilterProps) {
    return (
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6 w-full">

            {/* Left: Search Input */}
            <div className="relative w-full sm:w-auto sm:max-w-md">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                    type="text"
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="নাম বা টাইপ করে সার অনুসন্ধান করুন ..."
                    className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Right: Filter Dropdown */}
            <div className="relative">
                <FunnelIcon className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
                <select
                    onChange={(e) => onFilter(e.target.value)}
                    className="appearance-none pl-10 pr-6 py-2 border rounded-md w-44 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">সমস্ত বিভাগ</option>
                    <option value="fertilizer">সার</option>
                    <option value="pesticide">কীটনাশক</option>
                    <option value="organic">জৈব</option>
                </select>
            </div>

        </div>
    );
}
