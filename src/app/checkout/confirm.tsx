import { router, useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '@/providers/CartProvider';
import { fetchAddressById } from '@/api/address';
import { useAuth } from '@/providers/AuthProvider';
import { Address } from '@/types';
import { createOrder } from '@/api/order';

const ConfirmScreen = () => {
    const params = useGlobalSearchParams();

    const address = JSON.parse(Array.isArray(params.address) ? params.address[0] : params.address || '{}') as Address;
    const selectedMethod = Array.isArray(params.selectedMethod) ? params.selectedMethod[0] : params.selectedMethod || '';
    const total = Array.isArray(params.total) ? parseFloat(params.total[0]) : parseFloat(params.total || '0');
    const selectedPaymentMethod = Array.isArray(params.selectedPaymentMethod) ? params.selectedPaymentMethod[0] : params.selectedPaymentMethod || '';


    const [loading, setLoading] = useState(false);
    const { items, resetCart } = useCart();
    const { profile } = useAuth();

    const handleSubmit = () => {
        setLoading(true);
        try {
            const data = {
                user_id: profile?.id,
                address: JSON.stringify(address),
                delivery_method: selectedMethod,
                order_total: total + 1.25,
                payment_method: selectedPaymentMethod,
                delivery_status: 'pending',
                payment_status: 'pending',
                items: items,
                delivery_fee: '',
            };
            createOrder(data);

            resetCart();

            router.replace('/checkout/order_complete/');

            console.log('Form submitted:', address);
        } catch (error) {
            console.log('error:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Order Summary</Text>
            <View style={styles.orderSummary}>
                <Text style={styles.orderText}>Item's total ({items.length}): <Text style={styles.amount}>GH¢ {total}</Text></Text>
                <Text style={styles.orderText}>Delivery fees: <Text style={styles.free}>free</Text></Text>
                <Text style={styles.orderText}>Tax / Custom Fees: <Text style={styles.amount}>GH¢ 1.25</Text></Text>
                <Text style={styles.total}>Total: <Text style={styles.amount}>GH¢ {total + 1.25}</Text></Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.subHeader}>ADDRESS</Text>
                <Text style={styles.address}>{address?.first_name} {address?.last_name}</Text>
                <Text style={styles.address}>{address?.address}</Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.subHeader}>DELIVERY METHOD</Text>
                <Text style={styles.address}>{selectedMethod === 'door_delivery' ? 'Door Delivery' : 'Pick Up From Station'}</Text>
                <Text style={styles.deliveryInfo}>
                    Delivery between 5 Aug and {selectedMethod === 'door_delivery' ? '10 Sep.' : '8 Aug.'}
                </Text>
            </View>
            <View style={styles.orderSummary}>
                <Text style={styles.subHeader}>PAYMENT METHOD</Text>
                <Text style={styles.address}>{selectedPaymentMethod === 'cash_on_delivery' ? 'Cash On Delivery' : 'Mobile Payment'}</Text>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {loading ? 'Please wait...' : "CONFIRM ORDER"}
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
export default ConfirmScreen;