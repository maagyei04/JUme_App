import { router, useGlobalSearchParams } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '@/providers/CartProvider';
import { fetchAddressById } from '@/api/address';
import { useAuth } from '@/providers/AuthProvider';
import { Address } from '@/types';

const PaymentScreen = () => {
    const params = useGlobalSearchParams();

    const address = JSON.parse(Array.isArray(params.address) ? params.address[0] : params.address || '{}') as Address;
    const selectedMethod = Array.isArray(params.selectedMethod) ? params.selectedMethod[0] : params.selectedMethod || '';
    const total = Array.isArray(params.total) ? parseFloat(params.total[0]) : parseFloat(params.total || '0');

    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash_on_delivery');
    const { items } = useCart();
    const { profile } = useAuth();


    const handleSubmit = () => {
        setLoading(true);
        try {
            const data = {
                address: JSON.stringify(address),
                selectedMethod,
                total: total + 1.25,
                selectedPaymentMethod,
            };
            router.push({
                pathname: '/checkout/confirm',
                params: data,
            });
        } catch (error) {
            console.log('error:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Select Payment Method</Text>
            <View style={styles.orderSummary}>
                <Text style={styles.orderText}>Item's total ({items.length}): <Text style={styles.amount}>GH¢ {total}</Text></Text>
                <Text style={styles.orderText}>Delivery fees: <Text style={styles.free}>free (first 5 orders!)</Text></Text>
                <Text style={styles.orderText}>Tax / Custom Fees: <Text style={styles.amount}>GH¢ 1.25</Text></Text>
                <Text style={styles.total}>Total: <Text style={styles.amount}>GH¢ {total + 1.25}</Text></Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.subHeader}>ADDRESS</Text>
                <Text style={styles.address}>{address?.first_name} Agyei</Text>
                <Text style={styles.address}>Ayeduase, Amen Hostel Annex</Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.subHeader}>DELIVERY METHOD</Text>
                <Text style={styles.address}>{selectedMethod === 'door_delivery' ? 'Door Delivery' : 'Pick Up From Station'}</Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.subHeader}>PAYMENT METHOD</Text>
                <Text style={{ marginBottom: 5 }}>select among these 2 (violet means selected)</Text>
                <View style={{ flexDirection: 'column', alignItems: 'left' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: selectedPaymentMethod === 'mobile_payment' ? '#81008F' : '#808080', padding: 10, borderRadius: 20, margin: 5 }}
                        onPress={() => setSelectedPaymentMethod('mobile_payment')}
                    >
                        <Text style={{ color: selectedPaymentMethod === 'mobile_payment' ? 'white' : 'black' }}>Mobile Payment Now (currently not available)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: selectedPaymentMethod === 'cash_on_delivery' ? '#81008F' : '#808080', padding: 10, borderRadius: 20, margin: 5 }}
                        onPress={() => setSelectedPaymentMethod('cash_on_delivery')}
                    >
                        <Text style={{ color: selectedPaymentMethod === 'cash_on_delivery' ? 'white' : 'black' }}>Cash On Delivery</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {loading ? 'Please wait...' : "CONFIRM PAYMENT METHOD"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderSummary: {
        backgroundColor: 'white',
        marginBottom: 20,
        paddingBottom: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 5,
            width: -3
        }
    },
    orderText: {
        fontSize: 16,
        marginVertical: 2,
    },
    amount: {
        fontWeight: 'bold',
        color: '#000000',
    },
    free: {
        color: 'green',
    },
    total: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 16,
        marginVertical: 2,
    },
    methodContainer: {
        marginVertical: 10,
    },
    deliveryInfo: {
        marginVertical: 10,
        fontSize: 16,
    },
    shipment: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
    },
    shipmentHeader: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    shipmentText: {
        fontSize: 14,
        marginVertical: 2,
    },
    buttonStyle: {
        backgroundColor: '#81008F',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default PaymentScreen;