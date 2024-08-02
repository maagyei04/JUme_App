import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/providers/AuthProvider';
import { Address } from '@/types';

const AdressScreen = () => {
    const { profile } = useAuth();
    const [address, setAddress] = useState<Address | null>(null);

    return (
        <View style={styles.container}>
            <Text style={styles.noOrdersText}>You have an address stored yet, make an order</Text>
            <Link href={'/Profile/'} asChild>
                <Text style={{ marginTop: 10, color: '#6000C7' }}>Back to Profile page</Text>
            </Link>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrdersText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AdressScreen;