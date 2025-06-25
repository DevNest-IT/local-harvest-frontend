'use client';

interface AdminHeaderProps {
    user: {
        name: string;
    } | null;
}

export const AdminHeader = ({ user }: AdminHeaderProps) => {
    if (!user) return null;

    return (
        <header className="bg-white shadow-sm p-4 border-b border-gray-200 flex justify-end items-center">
            <div className="flex items-center gap-3">
                <span className="font-medium">Welcome, {user.name}</span>
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    );
};
