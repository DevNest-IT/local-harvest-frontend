'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = {
    '7d': [
        { name: 'Day 1', visitors: 10 },
        { name: 'Day 2', visitors: 15 },
        { name: 'Day 3', visitors: 8 },
        { name: 'Day 4', visitors: 20 },
        { name: 'Day 5', visitors: 12 },
        { name: 'Day 6', visitors: 18 },
        { name: 'Day 7', visitors: 25 },
    ],
    '1m': [
        { name: 'Week 1', visitors: 50 },
        { name: 'Week 2', visitors: 75 },
        { name: 'Week 3', visitors: 60 },
        { name: 'Week 4', visitors: 90 },
    ],
    '3m': [
        { name: 'Month 1', visitors: 200 },
        { name: 'Month 2', visitors: 250 },
        { name: 'Month 3', visitors: 220 },
    ],
    'all': [
        { name: 'Jan', visitors: 300 },
        { name: 'Feb', visitors: 400 },
        { name: 'Mar', visitors: 350 },
        { name: 'Apr', visitors: 500 },
        { name: 'May', visitors: 450 },
        { name: 'Jun', visitors: 600 },
    ],
};

export const VisitorGraph = () => {
    const [timeRange, setTimeRange] = useState<'7d' | '1m' | '3m' | 'all'>('7d');

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Visitor Analytics</h2>
                <div className="flex gap-2">
                    {(['7d', '1m', '3m', 'all'] as const).map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                timeRange === range
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {range === '7d' ? '7 Days' : range === '1m' ? '1 Month' : range === '3m' ? '3 Months' : 'All Time'}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data[timeRange]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visitors" stroke="#4f46e5" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
