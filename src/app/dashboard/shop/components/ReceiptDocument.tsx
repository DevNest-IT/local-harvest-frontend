// components/ReceiptDocument.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register the Bangla font
Font.register({
    family: 'HindSiliguri',
    src: '/fonts/HindSiliguri-Regular.ttf'
});

const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'HindSiliguri' },
    section: { marginBottom: 10 },
    header: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
    tableHeader: { fontSize: 12, marginBottom: 5, fontWeight: 'bold' },
    row: { flexDirection: 'row', marginBottom: 5 },
    cell: { flex: 1, fontSize: 10 },
    footer: { marginTop: 20, textAlign: 'center' }
});

export const ReceiptDocument = ({ sale, shop }: { sale: any, shop: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{shop.shop_name}</Text>
            <Text style={styles.section}>{shop.address}</Text>
            <Text style={styles.section}>Phone: {shop.contact_number}</Text>

            <Text style={styles.section}>Receipt No: {sale.receipt_no}</Text>
            <Text style={styles.section}>Date: {new Date(sale.created_at).toLocaleDateString()}</Text>

            <Text style={styles.section}>Bill To: {sale.customer_name || 'N/A'}</Text>
            <Text style={styles.section}>Phone: {sale.customer_phone || 'N/A'}</Text>
            <Text style={styles.section}>Salesperson: {sale.salesperson_name || 'N/A'}</Text>

            {/* Table Header */}
            <View style={[styles.row, { borderBottom: '1px solid black', marginBottom: 5 }]}>
                <Text style={styles.cell}>Item</Text>
                <Text style={styles.cell}>Category</Text>
                <Text style={styles.cell}>Qty</Text>
                <Text style={styles.cell}>Price</Text>
                <Text style={styles.cell}>Subtotal</Text>
            </View>

            {/* Table Rows */}
            {sale.items.map((item: any, index: number) => (
                <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{item.fertilizer.name}</Text>
                    <Text style={styles.cell}>{item.fertilizer.category}</Text>
                    <Text style={styles.cell}>{item.quantity}</Text>
                    <Text style={styles.cell}>{item.unit_price}</Text>
                    <Text style={styles.cell}>{item.subtotal}</Text>
                </View>
            ))}

            <View style={{ marginTop: 10 }}>
                <Text>Gross Amount: {sale.gross_amount}</Text>
                <Text>Discount: {sale.discount_percent}%</Text>
                <Text>Net Amount: {sale.net_amount}</Text>
            </View>

            <Text style={styles.footer}>Thank you for your business!</Text>
        </Page>
    </Document>
);
