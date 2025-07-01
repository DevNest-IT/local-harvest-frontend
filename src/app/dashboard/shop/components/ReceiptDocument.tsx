// components/ReceiptDocument.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register the Bangla font
Font.register({
    family: 'HindSiliguri',
    src: '/fonts/HindSiliguri-Regular.ttf'
});

// PDF Styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'HindSiliguri',
        fontSize: 10,
        lineHeight: 1.5
    },
    header: {
        textAlign: 'center',
        marginBottom: 10
    },
    shopName: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    shopAddress: {
        fontSize: 12,
        marginTop: 15
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginVertical: 10,
        marginBottom: 20
    },
    section: {
        marginBottom: 10
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        backgroundColor: '#f0f0f0',
        paddingVertical: 4
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        paddingVertical: 4
    },
    tableCellHeader: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tableCell: {
        flex: 1,
        textAlign: 'center'
    },
    totals: {
        marginTop: 15,
        alignSelf: 'flex-end',
        width: '50%'
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    totalsRowBold: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 12
    }
});

// React-PDF Component
export const ReceiptDocument = ({ sale, shop }: { sale: any, shop: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.shopName}>{shop.shop_name}</Text>
                <Text style={styles.shopAddress}>{shop.address}</Text>
                <Text style={styles.shopAddress}>Phone: {shop.contact_number}</Text>
            </View>
            <View style={styles.divider} />

            {/* Sale Info */}
            <View style={styles.section}>
                <View style={styles.infoRow}>
                    <Text>Receipt No: {sale.receipt_no}</Text>
                    <Text>Date: {new Date(sale.created_at).toLocaleDateString()}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>Customer: {sale.customer_name || 'N/A'}</Text>
                    <Text>Phone: {sale.customer_phone || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text>Salesperson: {sale.salesperson_name || 'N/A'}</Text>
                </View>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.tableCellHeader}>Item</Text>
                <Text style={styles.tableCellHeader}>Category</Text>
                <Text style={styles.tableCellHeader}>Qty</Text>
                <Text style={styles.tableCellHeader}>Price</Text>
                <Text style={styles.tableCellHeader}>Subtotal</Text>
            </View>

            {/* Table Rows */}
            {sale.items.map((item: any, index: number) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>{item.fertilizer.name}</Text>
                    <Text style={styles.tableCell}>{item.fertilizer.category}</Text>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                    <Text style={styles.tableCell}>{item.unit_price}</Text>
                    <Text style={styles.tableCell}>{item.subtotal}</Text>
                </View>
            ))}

            {/* Totals */}
            <View style={styles.totals}>
                <View style={styles.totalsRow}>
                    <Text>Gross Amount:</Text>
                    <Text>{sale.gross_amount}</Text>
                </View>
                <View style={styles.totalsRow}>
                    <Text>Discount:</Text>
                    <Text>{sale.discount_percent}%</Text>
                </View>
                <View style={styles.totalsRowBold}>
                    <Text>Net Amount:</Text>
                    <Text>{sale.net_amount}</Text>
                </View>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>Thank you for your business!</Text>
        </Page>
    </Document>
);
