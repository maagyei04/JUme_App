import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Product } from '@/types';
import { useCart } from '@/providers/CartProvider';
import { fetchProductsBySearchTerm } from '@/api/products';

const { width, height } = Dimensions.get('window');

type ProductListItemProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductListItem = ({ product, onAddToCart }: ProductListItemProps) => {

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

    return (
        <Link href={`/${product.id}`} asChild>
            <TouchableOpacity style={styles.product} onPressIn={handleDoubleTap}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: typeof product.image === 'string' ? product.image : 'product?.image' }} style={styles.productImage} />
                    <TouchableOpacity style={styles.favouriteButton} onPress={handleFavoriteToggle}>
                        <AntDesign name={isFavorite ? "heart" : "hearto"} size={20} color={isFavorite ? '#FF007F' : '#A146E2'} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.productText}>{product.name}</Text>
                <Text style={styles.productPrice}>GHS {product.price}.00</Text>
                <TouchableOpacity style={styles.liveChatButton} onPress={() => onAddToCart(product)}>
                    <Text style={styles.flashSalesText}>Add To Cart</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    );
};

const CategoryDetailsScreen = () => {
    const { name: categoryName = '' } = useLocalSearchParams();

    const name = Array.isArray(categoryName) ? categoryName[0] : categoryName;

    const { data: product, isLoading, error, refetch } = fetchProductsBySearchTerm(name);

    const { addItem, items } = useCart();
    const router = useRouter();

    const itemCount = items.length;


    const addToCart = (product: Product) => {
        if (!product) {
            return;
        }
        addItem(product, 'M');
        router.push('/cart');
    };

    const onRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

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
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                <Stack.Screen options={{
                    title: `Category: ${name}`,
                    headerRight: () => (
                        <Link href="/cart" asChild>
                            <Pressable style={styles.cartIcon}>
                                <AntDesign name="shoppingcart" size={25} style={styles.icon} />
                                {itemCount > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{itemCount}</Text>
                                    </View>
                                )}
                            </Pressable>
                        </Link>
                    )
                }} />

                <FlatList
                    data={product}
                    numColumns={2}
                    renderItem={({ item }) => <ProductListItem product={item} onAddToCart={addToCart} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.products}
                />

            </ScrollView>

        </View>
    );
}

export default CategoryDetailsScreen;

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'black',
        borderRadius: 9,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginLeft: 10,
    },
    cartIcon: {
        marginLeft: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    banner: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#fffffff',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 12,
    },
    bannerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    shopNowButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        width: 'auto'
    },
    shopNowText: {
        color: '#e7c5ff',
        fontWeight: 'bold',
    },
    bannerImage: {
        width: 120,
        height: 120,
        marginTop: 10,
    },
    categories: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    category: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    categoryIcon: {
        width: 50,
        height: 50,
    },
    categoryText: {
        marginTop: 5,
        fontSize: 12,
    },
    categoryContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 8,
        margin: 5,
        alignItems: 'center',
        shadowColor: '#575757',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 1,
    },
    flashSales: {
        backgroundColor: '#FF007F',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flashSalesText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    flashSalesTimer: {
        color: '#fff',
    },
    seeAllButton: {
        padding: 5,
    },
    seeAllText: {
        color: '#FBFBFB',
        fontWeight: 'bold',
    },
    seeAllText2: {
        color: '#A146E2',
        fontWeight: 'bold',
    },
    latestProducts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    latestProductsText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    products: {
        justifyContent: 'space-around',
    },
    product: {
        margin: 5,
        flex: 1,
        maxWidth: '50%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    productImage: {
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
    productText: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
    },
    productPrice: {
        marginTop: 5,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold'
    },
    liveChatButton: {
        backgroundColor: '#A146E2',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    favouriteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#ffffff'
    },
});