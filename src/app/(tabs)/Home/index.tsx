import { Category, Product } from '@/types';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { useCart } from '@/providers/CartProvider';
import { Link, useRouter, useSegments } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import { fetchProducts } from '@/api/products';

type ProductListItemProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
}

type CategoryListItemProps = {
  category: Category;
}

type BannerProps = {
  index: number;
  banners: { image: ImageSourcePropType }[];
}

const categories = [
  {
    id: 1,
    name: 'Phones',
    image: require('@assets/images/smartphones.png'),
  },
  {
    id: 2,
    name: 'Beauty',
    image: require('@assets/images/beauty2.png'),
  },
  {
    id: 3,
    name: 'Sneakers',
    image: require('@assets/images/sneakers.png'),
  },
  {
    id: 4,
    name: 'Electronics',
    image: require('@assets/images/electronics.png'),
  },
  {
    id: 5,
    name: 'Watches',
    image: require('@assets/images/watch.png'),
  },
]

const ProductListItem = ({ product, onAddToCart }: ProductListItemProps) => {
  const segments = useSegments();

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
          <Image source={product.image} style={styles.productImage} />
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

const CategoryListItem = ({ category }: CategoryListItemProps) => {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.category}>
        <Image source={category.image} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Banner = ({ index, banners }: BannerProps) => (
  <LinearGradient
    colors={['#A146E2', '#770063']}
    style={styles.banner}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Text style={styles.bannerText}>50% off in Apple Watch</Text>
        <TouchableOpacity style={styles.shopNowButton}>
          <Text style={styles.shopNowText}>Shop Now !</Text>
        </TouchableOpacity>
      </View>
      <Image source={banners[index].image} style={styles.bannerImage} />
    </View>
  </LinearGradient>
);

export default function HomeScreen() {
  const { data: products, isLoading, error } = fetchProducts();

  console.log('p:', products);

  const { addItem } = useCart();
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  const router = useRouter();

  const banners = [
    { image: require('@assets/images/watch.png') },
    { image: require('@assets/images/headset.png') },
    { image: require('@assets/images/shirts.png') },
    { image: require('@assets/images/laptop.png') },
    { image: require('@assets/images/headset2.png') },
  ];

  const addToCart = (product: Product) => {
    if (!product) {
      return;
    }
    addItem(product, 'M');
    router.push('/cart');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % banners.length;
        if (bannerScrollRef.current) {
          bannerScrollRef.current.scrollTo({ x: newIndex * 300, animated: true });
        }
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (bannerIndex === banners.length - 1) {
      setTimeout(() => {
        if (bannerScrollRef.current) {
          bannerScrollRef.current.scrollTo({ x: 0, animated: false });
        }
        setBannerIndex(0);
      }, 3000);
    }
  }, [bannerIndex]);


  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <ScrollView horizontal pagingEnabled ref={bannerScrollRef} showsHorizontalScrollIndicator={false}>
        {banners.map((banner, index) => (
          <Banner key={index} index={bannerIndex} banners={banners} />
        ))}
      </ScrollView>

      {/* Categories */}
      <ScrollView horizontal style={styles.categories} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryListItem category={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={categories.length}
        />
      </ScrollView>

      {/* Flash Sales */}
      <View style={styles.flashSales}>
        <Text style={styles.flashSalesText}>FLASH SALES</Text>
        <Text style={styles.flashSalesTimer}>TIME LEFT: 02d : 23h : 48m</Text>
        <Pressable style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </Pressable>
      </View>

      {/* Latest Products */}
      <View style={styles.latestProducts}>
        {isLoading ? <ActivityIndicator /> : (
          <>
            <Text style={styles.latestProductsText}>Latest Products</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText2}>SEE ALL</Text>
            </Pressable>
          </>
        )}
        {error && <Text>Error: {error.message}</Text>}
      </View>
      <FlatList

        data={products}
        numColumns={2}
        renderItem={({ item }) => <ProductListItem product={item} onAddToCart={addToCart} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.products}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 50,
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
