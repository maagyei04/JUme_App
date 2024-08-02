import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VouchersScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.noOrdersText}>There are no Vouchers available yet</Text>
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

export default VouchersScreen;