'use client';
import { X, Printer, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getShopProfile } from '@/app/services/api';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { ReceiptDocument } from './ReceiptDocument'; // The React-PDF component we discussed earlier

export const SaleDetailsModal = ({ sale, onCancel }: { sale: any, onCancel: () => void }) => {
    const [downloading, setDownloading] = useState(false);
    const [shopProfile, setShopProfile] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getShopProfile(token).then(res => setShopProfile(res.data));
        }
    }, []);

    if (!sale) return null;

    // ✅ New Download Handler using React-PDF
    const handleDownload = async () => {
        if (shopProfile) {
            setDownloading(true);
            const blob = await pdf(<ReceiptDocument sale={sale} shop={shopProfile} />).toBlob();
            saveAs(blob, `receipt-${sale.receipt_no}.pdf`);
            setDownloading(false);
        }
    };

    // Print logic remains the same (you can improve this later)
    const handlePrint = () => {
        const printContent = document.getElementById('receipt-content');
        const windowUrl = 'about:blank';
        const uniqueName = new Date().getTime();
        const windowName = 'Print' + uniqueName;
        const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

        if (printWindow && printContent) {
            printWindow.document.write('<html><head><title>Print Receipt</title>');
            printWindow.document.write('<link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" type="text/css" />');
            printWindow.document.write('</head><body>');
            printWindow.document.write(printContent.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Sale Details</h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div id="receipt-content">
                    <p><strong>Receipt No:</strong> {sale.receipt_no}</p>
                    <p><strong>Customer:</strong> {sale.customer_name || 'N/A'}</p>
                    <p><strong>Phone:</strong> {sale.customer_phone || 'N/A'}</p>
                    <p><strong>Salesperson:</strong> {sale.salesperson_name || 'N/A'}</p>
                    <p><strong>Date:</strong> {new Date(sale.created_at).toLocaleString()}</p>

                    <table className="w-full mt-4">
                        <thead>
                            <tr>
                                <th className="text-left">Item</th>
                                <th className="text-right">Qty</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.items.map((item: any) => (
                                <tr key={item.id}>
                                    <td>{item.fertilizer.name}</td>
                                    <td className="text-right">{item.quantity}</td>
                                    <td className="text-right">{item.unit_price}</td>
                                    <td className="text-right">{item.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 text-right">
                        <p><strong>Gross Amount:</strong> {sale.gross_amount}</p>
                        <p><strong>Discount:</strong> {sale.discount_percent}%</p>
                        <p><strong>Net Amount:</strong> {sale.net_amount}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300" disabled={downloading}>
                        <Download size={20} />
                        <span>{downloading ? 'Downloading...' : 'Download'}</span>
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                        <Printer size={20} />
                        <span>Print</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
