import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCart } from '@/providers/CartProvider';
import { useAuth } from '@/providers/AuthProvider';
import { Link } from 'expo-router';
import CartListItem from '@/components/CartListItem';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

const CartScreen = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { session, profile } = useAuth();

    useEffect(() => {
        if (session) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [session]);

    console.log(profile);

    const { items, total } = useCart();

    if (items.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <LottieView style={{ height: 200, width: 200 }}
                    source={require('../../assets/animations/emptycart.json')}
                    autoPlay
                    loop
                />
                <Text style={styles.emptyText}>Your cart is empty!</Text>
                <Text style={styles.suggestionText}>Browse our categories and discover our best deals!</Text>
                <Link href="/(tabs)/Home/" style={styles.link}>
                    <Text style={styles.linkText}>Start Shopping!</Text>
                </Link>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        );
    }

    const handleLoginPress = () => {
        router.replace('/(auth)/AuthScreen/');
    };

    return (

        <View style={{ padding: 10, }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>Total: GH¢ {total}</Text>

            {userLoggedIn && (
                <TouchableOpacity onPress={() => router.replace("/checkout/address")} style={styles.button}>
                    <Text style={styles.text}>Checkout</Text>
                </TouchableOpacity>
            )}

            {!userLoggedIn && (
                <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                    <Text style={styles.text}>Login to Checkout</Text>
                </TouchableOpacity>
            )}

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
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#81008F',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    }
});

export default CartScreen;