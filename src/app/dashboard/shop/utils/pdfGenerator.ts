import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateReceiptPdf = (sale: any, shop: any) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text(shop.shop_name, 10, 20);
    doc.setFontSize(10);
    doc.text(shop.address, 10, 28);
    doc.text(`Phone: ${shop.contact_number}`, 10, 34);

    // Receipt Details
    doc.setFontSize(12);
    doc.text(`Receipt No: ${sale.receipt_no}`, 150, 20);
    doc.text(`Date: ${new Date(sale.created_at).toLocaleDateString()}`, 150, 28);

    // Customer Details
    doc.setFontSize(12);
    doc.text('Bill To:', 10, 50);
    doc.setFontSize(10);
    doc.text(`Customer: ${sale.customer_name || 'N/A'}`, 10, 56);
    doc.text(`Phone: ${sale.customer_phone || 'N/A'}`, 10, 62);

    // Salesperson
    doc.setFontSize(10);
    doc.text(`Salesperson: ${sale.salesperson_name || 'N/A'}`, 150, 56);


    // Items Table
    const tableColumn = ["Item", "Category", "Qty", "Price", "Subtotal"];
    const tableRows: any[] = [];

    if (sale.items && Array.isArray(sale.items)) {
        sale.items.forEach((item: any) => {
            const itemData = [
                item.fertilizer.name,
                item.fertilizer.category,
                item.quantity,
                `${item.unit_price}`,
                `${item.subtotal}`,
            ];
            tableRows.push(itemData);
        });
    }

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 70,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY || 70;
    doc.setFontSize(10);
    doc.text(`Gross Amount:`, 150, finalY + 10);
    doc.text(`${sale.gross_amount}`, 180, finalY + 10);
    doc.text(`Discount:`, 150, finalY + 16);
    doc.text(`${sale.discount_percent}%`, 180, finalY + 16);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Net Amount:`, 150, finalY + 22);
    doc.text(`${sale.net_amount}`, 180, finalY + 22);
    doc.setFont('helvetica', 'normal');


    // Footer
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 105, 280, { align: 'center' });


    doc.save(`receipt-${sale.receipt_no}.pdf`);
};
