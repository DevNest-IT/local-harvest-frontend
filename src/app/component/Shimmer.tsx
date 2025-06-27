'use client';

export const Shimmer = () => (
    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
);

export const CardShimmer = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Shimmer />
        <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
    </div>
);
