import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const OrderComplete = () => {
    const bounceAnimation = useRef(new Animated.Value(0)).current;
    const bgColorAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnimation, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceAnimation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(bgColorAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(bgColorAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const animatedStyle = {
        transform: [
            {
                scale: bounceAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 0.9, 1],
                }),
            },
        ],
    };

    const bgColorAnimatedStyle = {
        backgroundColor: bgColorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#BA00CF', '#81008F'],
        }),
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.verifiedIcon, animatedStyle]}>
                <FontAwesome name="check-circle" size={120} color="#4CAF50" />
            </Animated.View>

            <Text style={styles.title}>Order Complete</Text>
            <Text style={styles.message}>Thank you for your purchase!</Text>
            <Button
                title="Continue Shopping"
                onPress={() => {
                    router.replace('/');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    verifiedIcon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    orderNumber: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default OrderComplete;