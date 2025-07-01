import pdfMake from 'pdfmake/build/pdfmake';
import { font as hindSiliguriFont } from './HindSiliguri-Regular-normal';

(pdfMake as any).vfs = {
    "HindSiliguri-Regular.ttf": hindSiliguriFont
};

(pdfMake as any).fonts = {
    HindSiliguri: {
        normal: 'HindSiliguri-Regular.ttf',
        bold: 'HindSiliguri-Regular.ttf',
        italics: 'HindSiliguri-Regular.ttf',
        bolditalics: 'HindSiliguri-Regular.ttf'
    }
};

export const generateReceiptPdf = (sale: any, shop: any) => {
    const docDefinition = {
        content: [
            { text: shop.shop_name, fontSize: 20, bold: true, font: 'HindSiliguri' },
            { text: shop.address, fontSize: 10, font: 'HindSiliguri' },
            { text: `Phone: ${shop.contact_number}`, fontSize: 10, margin: [0, 0, 0, 10], font: 'HindSiliguri' },

            { text: `Receipt No: ${sale.receipt_no}`, alignment: 'right', font: 'HindSiliguri' },
            { text: `Date: ${new Date(sale.created_at).toLocaleDateString()}`, alignment: 'right', font: 'HindSiliguri' },

            { text: 'Bill To:', bold: true, margin: [0, 10, 0, 0], font: 'HindSiliguri' },
            { text: `Customer: ${sale.customer_name || 'N/A'}`, font: 'HindSiliguri' },
            { text: `Phone: ${sale.customer_phone || 'N/A'}`, font: 'HindSiliguri' },
            { text: `Salesperson: ${sale.salesperson_name || 'N/A'}`, alignment: 'right', font: 'HindSiliguri' },

            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['Item', 'Category', 'Qty', 'Price', 'Subtotal'],
                        ...sale.items.map((item: any) => [
                            item.fertilizer.name,
                            item.fertilizer.category,
                            item.quantity,
                            item.unit_price,
                            item.subtotal
                        ])
                    ]
                },
                font: 'HindSiliguri',
                margin: [0, 10, 0, 0]
            },

            {
                columns: [
                    { width: '*', text: '' },
                    {
                        width: 'auto',
                        table: {
                            body: [
                                ['Gross Amount:', sale.gross_amount],
                                ['Discount:', `${sale.discount_percent}%`],
                                [{ text: 'Net Amount:', bold: true }, { text: sale.net_amount, bold: true }]
                            ]
                        },
                        layout: 'noBorders',
                        font: 'HindSiliguri',
                        margin: [0, 10, 0, 0]
                    }
                ]
            },

            { text: 'Thank you for your business!', alignment: 'center', margin: [0, 20, 0, 0], font: 'HindSiliguri' }
        ],
        defaultStyle: {
            font: 'HindSiliguri'
        }
    };

    pdfMake.createPdf(docDefinition as any).download(`receipt-${sale.receipt_no}.pdf`);
};
