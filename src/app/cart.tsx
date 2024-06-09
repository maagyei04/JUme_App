import React from 'react';
import { View, Text, Platform, StyleSheet, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCart } from '@/providers/CartProvider';
import { Link } from 'expo-router';
import CartListItem from '@/components/CartListItem';

const CartScreen = () => {
    const { items } = useCart();

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <FontAwesome name='shopping-cart' size={80} color="#888" />
                <Text style={styles.emptyText}>Your cart is empty!</Text>
                <Text style={styles.suggestionText}>Browse our categories and discover our best deals!</Text>
                <Link href="/" style={styles.link}>
                    <Text style={styles.linkText}>Start Shopping!</Text>
                </Link>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        );
    }

    return (

        <View>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    emptyText: {
        fontSize: 24,
        color: '#333',
        marginVertical: 10,
    },
    suggestionText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginVertical: 10,
    },
    startButton: {
        backgroundColor: '#FF007F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

export default CartScreen;
