import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Product } from '@/types';
import { useCart } from '@/providers/CartProvider';
import { fetchProductsById } from '@/api/products';

const { width, height } = Dimensions.get('window');


const ProductDetailsScreen = () => {
    const { id: idString = '' } = useLocalSearchParams();

    const id = parseFloat(Array.isArray(idString) ? idString[0] : idString);

    const { data: product, isLoading, error } = fetchProductsById(id);

    const { addItem } = useCart();
    const router = useRouter();


    const [isFavorite, setIsFavorite] = useState(false);
    const [lastPress, setLastPress] = useState(0);

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    const handleDoubleTap = () => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        if (delta < 300) {
            handleFavoriteToggle();
        }
        setLastPress(time);
    };

    const addToCart = (product: Product) => {
        if (!product) {
            return;
        }
        addItem(product, 'M');
        router.push('/cart');
    };

    if (!product) {
        return <Text>Product not found</Text>;
    }

    if (isLoading) {
        return <ActivityIndicator size="large" color="#000" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Stack.Screen options={{
                    title: `Product Details: ${product?.name}`,
                    headerRight: () => (
                        <Link href="/cart" asChild>
                            <Pressable style={styles.cartIcon}>
                                <AntDesign name="shoppingcart" size={25} style={styles.icon} />
                            </Pressable>
                        </Link>
                    )
                }} />

                <Image
                    source={product?.image}
                    style={styles.productImage}
                />

                <View style={styles.detailsContainer}>
                    <Text style={styles.productTitle}>
                        {product?.name}
                    </Text>
                    <Text style={styles.productBrand}>
                        Brand: LG | Similar products from LG
                    </Text>
                    <Text style={styles.productPrice}>
                        GH₵ {product?.price} <Text style={styles.productPriceOld}>GH₵ {product?.price + product?.price}</Text> <Text style={styles.discount}>-50%</Text>
                    </Text>
                    <Text style={styles.stockInfo}>
                        Few units left
                    </Text>
                    <Text style={styles.deliveryInfo}>
                        Order above GH₵ 150 on Jume express items & get free delivery | regular delivery from GH₵19.04 to Santasi.
                    </Text>
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={24} color="gold" />
                        <FontAwesome name="star" size={24} color="gold" />
                        <FontAwesome name="star" size={24} color="gold" />
                        <FontAwesome name="star" size={24} color="gold" />
                        <FontAwesome name="star-o" size={24} color="gold" />
                        <Text style={styles.ratingText}>20 ratings</Text>
                        <TouchableOpacity style={styles.shareButton}>
                            <FontAwesome5 name="share" size={24} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.wishlistButton} onPress={handleFavoriteToggle}>
                            <MaterialCommunityIcons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? '#FF007F' : '#A146E2'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.promotionsContainer}>
                    <Text style={styles.sectionTitle}>Promotions</Text>
                    {/* Add promotion details here */}
                </View>

                <View style={styles.deliveryReturnsContainer}>
                    <Text style={styles.sectionTitle}>Delivery & Returns</Text>
                    <View style={styles.locationContainer}>
                        <Text style={styles.subTitle}>Choose Location</Text>
                        <View style={styles.dropdown}>
                            <Text>Ashanti</Text>
                        </View>
                        <View style={styles.dropdown}>
                            <Text>Santasi</Text>
                        </View>
                    </View>
                    <View style={styles.pickupContainer}>
                        <Text style={styles.subTitle}>Pickup Station</Text>
                        <Text style={styles.pickupDetails}>Delivery Fees GH₵19.04</Text>
                        <Text style={styles.pickupDetails}>Ready for pickup between 25 Jun when you order within next 22hrs 24mins</Text>
                    </View>
                    <View style={styles.returnPolicyContainer}>
                        <Text style={styles.subTitle}>Return Policy</Text>
                        <Text>Free return within 15 days for all eligible items</Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text>- Color: Grey</Text>
                    <Text>- Material: - </Text>
                    <Text>- Easy To Assemble...</Text>
                </View>

            </ScrollView>

            <View style={styles.bottomNavBar}>
                <Link href='/(tabs)/Home/' asChild>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="home-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </Link>
                <Link href='tel:+233541190955' asChild>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="call-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product)}>
                    <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
                    <FontAwesome name="shopping-cart" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 100,
    },
    cartIcon: {
        marginRight: 15,
    },
    icon: {
        width: 24,
        height: 24,
    },
    productImage: {
        alignSelf: 'center',
        height: 250,
        width: width,
        resizeMode: 'contain',
    },
    detailsContainer: {
        padding: 16,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productBrand: {
        color: '#888',
        marginVertical: 8,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    productPriceOld: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    discount: {
        color: 'red',
    },
    stockInfo: {
        marginVertical: 8,
        color: 'red',
    },
    deliveryInfo: {
        marginVertical: 8,
        color: '#888',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    ratingText: {
        marginLeft: 8,
        color: '#888',
    },
    shareButton: {
        marginLeft: 'auto',
    },
    wishlistButton: {
        marginLeft: 16,
    },
    promotionsContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    deliveryReturnsContainer: {
        padding: 16,
    },
    locationContainer: {
        marginBottom: 16,
    },
    subTitle: {
        fontWeight: 'bold',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
    },
    pickupContainer: {
        marginBottom: 16,
    },
    pickupDetails: {
        color: '#888',
    },
    returnPolicyContainer: {
        marginBottom: 16,
    },
    descriptionContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    reviewsContainer: {
        padding: 16,
    },
    rating: {
        fontWeight: 'bold',
    },
    reviewText: {
        marginVertical: 8,
    },
    reviewAuthor: {
        color: '#888',
    },
    verifiedPurchase: {
        color: 'green',
    },
    bottomNavBar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: 'gray',
        alignItems: 'center',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
    },
    addToCartButton: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A146E2',
        height: '100%',
    },
    addToCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
});