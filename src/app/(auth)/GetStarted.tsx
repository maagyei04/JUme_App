import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Link, Stack } from 'expo-router';

const GetStarted = () => {
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
            inputRange: [0, 1, 2],
            outputRange: ['purple', 'hotpink', 'blue'],
        }),
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.imageContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={[styles.mainImageContainer, animatedStyle]}>
                        <Image source={require('@assets/images/watch.png')} style={styles.mainImage} />
                    </Animated.View>
                    <View style={{ flexDirection: 'column' }}>
                        <Animated.View style={[styles.sm1Image, bgColorAnimatedStyle]}>
                            <Image source={require('@assets/images/sneakers.png')} style={styles.smallImage} />
                        </Animated.View>
                        <Animated.View style={[styles.sm1Image, bgColorAnimatedStyle]}>
                            <Image source={require('@assets/images/bag.png')} style={styles.smallImage} />
                        </Animated.View>
                        <Animated.View style={[styles.sm1Image, bgColorAnimatedStyle]}>
                            <Image source={require('@assets/images/chair2.png')} style={styles.smallImage} />
                        </Animated.View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={[styles.sm1Image, bgColorAnimatedStyle]}>
                        <Image source={require('@assets/images/beauty.png')} style={styles.smallImage} />
                    </Animated.View>
                    <Animated.View style={[styles.smImage, bgColorAnimatedStyle]}>
                        <Image source={require('@assets/images/laptop.png')} style={styles.smallImage} />
                        <Image source={require('@assets/images/smartphones.png')} style={styles.smallImage} />
                    </Animated.View>
                </View>
            </View>
            <Text style={styles.title}>Welcome To The World Of Hassle-Free Shopping</Text>
            <Text style={styles.subtitle}>Shop any product, brand...</Text>
            <Link href={'/AuthScreen'} asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </Link>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    mainImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 10,
        backgroundColor: 'hotpink',
    },
    smallImage: {
        width: 60,
        height: 60,
    },
    smImage: {
        backgroundColor: 'purple',
        paddingHorizontal: 50,
        paddingVertical: 10,
        flexDirection: 'row',
        borderRadius: 30,
        margin: 5,
    },
    sm1Image: {
        backgroundColor: 'purple',
        paddingHorizontal: 30,
        paddingVertical: 10,
        flexDirection: 'row',
        borderRadius: 30,
        margin: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#4A4A4A',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FF007A',
        paddingVertical: 15,
        paddingHorizontal: 90,
        borderRadius: 30,
        marginBottom: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 14,
        color: '#4A4A4A',
        textAlign: 'center',
    },
    mainImageContainer: {
        alignItems: 'center',
    },
});

export default GetStarted;