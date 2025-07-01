'use client';
import { useState, useEffect } from 'react';
import { getSales, searchSale, getShopProfile } from '@/app/services/api';
import { Plus, Eye, Download, Printer } from 'lucide-react';
import { generateReceiptPdf } from '../utils/pdfGenerator';
import { CreateSaleModal } from './CreateSaleModal';
import { SaleDetailsModal } from './SaleDetailsModal';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { ReceiptDocument } from './ReceiptDocument'; 


export const Sales = () => {

    const handleDownload = async (sale: any) => {
        if (shopProfile) {
            const blob = await pdf(<ReceiptDocument sale={sale} shop={shopProfile} />).toBlob();
            saveAs(blob, `receipt-${sale.receipt_no}.pdf`);
        }
    };


    const [sales, setSales] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [shopProfile, setShopProfile] = useState<any>(null);

    const fetchSales = async (page: number = 1) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await getSales(token, page);
            setSales(response.data.data);
            setPagination(response.data);
        } catch (err) {
            setError('Failed to fetch sales.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getShopProfile(token).then(res => setShopProfile(res.data));
        }
        fetchSales();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery) {
            fetchSales();
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found.');
            return;
        }
        try {
            setLoading(true);
            const response = await searchSale(searchQuery, token);
            setSales([response.data]);
        } catch (err) {
            setError('Sale not found.');
            setSales([]);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (sale: any) => {
        setSelectedSale(sale);
        setShowDetailsModal(true);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Sales History</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Search by Receipt No."
                        className="p-2 border rounded-lg"
                    />
                    <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                        <Plus size={20} />
                        <span>Create Sale</span>
                    </button>
                </div>
            </div>

            {loading && <p>Loading sales...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4">
                {sales.map(sale => (
                    <div key={sale.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">Receipt No: {sale.receipt_no}</h3>
                            <p className="text-sm text-gray-600">
                                Customer: {sale.customer_name || 'N/A'} | Total: {sale.net_amount}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => handleViewDetails(sale)} className="text-gray-500 hover:text-indigo-600">
                                <Eye size={20} />
                            </button>
                            <button onClick={() => handleDownload(sale)} className="text-gray-500 hover:text-indigo-600" disabled={!shopProfile}>
                                <Download size={20} />
                            </button>

                            <button onClick={() => window.print()} className="text-gray-500 hover:text-indigo-600">
                                <Printer size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {pagination && (
                <div className="flex justify-center mt-6">
                    {pagination.links.map((link: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => link.url && fetchSales(link.url.split('page=')[1])}
                            className={`px-4 py-2 mx-1 rounded-lg ${link.active ? 'bg-indigo-600 text-white' : 'bg-gray-200'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                        />
                    ))}
                </div>
            )}

            {showCreateModal && <CreateSaleModal onFormSubmit={() => { setShowCreateModal(false); fetchSales(); }} onCancel={() => setShowCreateModal(false)} />}
            {showDetailsModal && <SaleDetailsModal sale={selectedSale} onCancel={() => setShowDetailsModal(false)} />}
        </div>
    );
};
