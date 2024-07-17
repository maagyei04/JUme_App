import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const products = [
        {
            id: 1,
            name: 'Wireless Waterproof Bluetooth JBL Speaker + charging cable and holder - Red',
            price: 150,
            image: require('@assets/images/speaker.png')
        },
        {
            id: 2,
            name: 'LG T1066NEFVF2 - 10kg - Smart Inverter Automatic Washing Machine Black - Grey',
            price: 6387,
            image: require('@assets/images/washingmachine.png')
        },
        {
            id: 3,
            name: 'Sports vintage bag - Black',
            price: 139,
            image: require('@assets/images/bag.png')
        },
        {
            id: 4,
            name: 'Gaming Headset - Black',
            price: 139,
            image: require('@assets/images/headset3.png')
        },
    ]

    const product = products.find((p) => p.id.toString() === id);

    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Stack.Screen options={{
                    title: 'Product Details: ' + product?.name,
                    headerRight: () => {
                        return <Link href="/cart" asChild>
                            <Pressable style={styles.cartIcon}>
                                {({ pressed }) => (
                                    <AntDesign name="shoppingcart" size={25} style={styles.icon} />
                                )}
                            </Pressable>
                        </Link>;
                    }
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
                        <TouchableOpacity style={styles.wishlistButton}>
                            <MaterialCommunityIcons name="heart-outline" size={24} color="pink" />
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

                <View style={styles.reviewsContainer}>
                    <Text style={styles.sectionTitle}>Product Rating & Reviews</Text>
                    <Text style={styles.rating}>4.3/5 | 1 rating</Text>
                    <Text style={styles.reviewText}>I like it</Text>
                    <Text>Stable, can withstand 15kgs of weight, and looks as in th picture</Text>
                    <Text style={styles.reviewAuthor}>by George</Text>
                    <Text style={styles.verifiedPurchase}>Verified Purchase</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomNavBar}>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="call-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton}>
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
        paddingBottom: 100, // Adjust to ensure ScrollView doesn't overlap with the button
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
        height: 60,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 50
    },
    addToCartButton: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'hotpink',
        height: '100%',
    },
    addToCartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
});
