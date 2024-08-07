import { Category, Product } from '@/types';
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, ImageSourcePropType, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useCart } from '@/providers/CartProvider';
import { Link, useRouter, useSegments } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchProducts, fetchProductsBySearchTerm } from '@/api/products';
import { useSearch } from '@/providers/SearchProvider';
import LottieView from 'lottie-react-native';


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
    name: 'Fashion',
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
          <Image source={{ uri: typeof product.image === 'string' ? product.image : 'product?.image' }} style={styles.productImage} resizeMode="contain" />
          <TouchableOpacity style={styles.favouriteButton} onPress={handleFavoriteToggle}>
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={20} color={isFavorite ? '#FF007F' : '#A146E2'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.productText}>{product.name}</Text>
        <Text style={styles.productPrice}>GH¢ {product.price}.00</Text>
        <TouchableOpacity style={styles.liveChatButton} onPress={() => onAddToCart(product)}>
          <Text style={styles.flashSalesText}>Add To Cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

const CategoryListItem = ({ category }: CategoryListItemProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/category/${encodeURIComponent(category.name)}`);
  };

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.category} onPress={handlePress}>
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
    <View style={{ height: 140, width: 300 }}>
      <Image source={banners[index].image} style={{ width: '100%', height: '100%' }} />
    </View>
  </LinearGradient>
);

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate: Date) {
  const difference = +targetDate - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

export default function HomeScreen() {
  const { data: products, isLoading, error, refetch } = fetchProducts();
  const { addItem } = useCart();
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { debouncedSearchTerm } = useSearch();

  const { data: searchResults, isLoading: searchLoading, error: searchError } = fetchProductsBySearchTerm(debouncedSearchTerm);

  const targetDate = useMemo(() => new Date('2024-08-05T23:59:59'), []);
  const timeLeft = useCountdown(targetDate);

  console.log('p:', products);

  const handlePress = () => {
    router.push(`/category/${encodeURIComponent('flash_sales')}`);
  };

  const banners = [
    { image: require('@assets/images/banner1.jpeg') },
    { image: require('@assets/images/banner2.jpeg') },
    { image: require('@assets/images/banner3.jpeg') },
    { image: require('@assets/images/banner4.jpeg') },
    { image: require('@assets/images/banner5.jpeg') },
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductListItem product={item} onAddToCart={addToCart} />
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {debouncedSearchTerm === '' ? (
        <>
          {/* Banner */}
          <ScrollView
            horizontal
            pagingEnabled
            ref={bannerScrollRef}
            showsHorizontalScrollIndicator={false}
          >
            {banners.map((_, index) => (
              <Banner key={index} index={index} banners={banners} />
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
          <TouchableOpacity style={styles.flashSales} onPress={handlePress}>
            <Text style={styles.flashSalesText}>FLASH SALES</Text>
            <Text style={styles.flashSalesTimer}>
              TIME LEFT: {String(timeLeft.days).padStart(2, '0')}d :
              {String(timeLeft.hours).padStart(2, '0')}h :
              {String(timeLeft.minutes).padStart(2, '0')}m :
              {String(timeLeft.seconds).padStart(2, '0')}s
            </Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>SEE ALL</Text>
            </Pressable>
          </TouchableOpacity>

          {/* Latest Products */}
          <View style={styles.latestProducts}>
            {isLoading ? <ActivityIndicator /> : (
              <>
                <Text style={styles.latestProductsText}>Latest Products</Text>
                <Pressable style={styles.seeAllButton} onPress={() => router.push('/Categories/')}>
                  <Text style={styles.seeAllText2}>SEE ALL</Text>
                </Pressable>
              </>
            )}
            {error && <Text>Error: {error.message}</Text>}
          </View>

          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.products}
          />
        </>
      ) : (
        <View style={styles.searchResultsContainer}>
          {searchLoading ? (
            <LottieView style={{ height: 400, width: 400 }}
              source={require('@assets/animations/loading.json')}
              autoPlay
              loop
            />
          ) : searchError || searchResults?.length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.searchResultsText}>No products found</Text>
            </View>
          ) : (
            <>
              <Text style={styles.searchResultsText}>Search Results</Text>
              <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.products}
              />
            </>
          )}
        </View>
      )}
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
    borderRadius: 10,
    margin: 5,
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
    backgroundColor: '#A146E2',
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
    color: '#81008F',
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
    width: '100%',
    height: 150,
    alignSelf: 'center',
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
    backgroundColor: '#81008F',
    padding: 12,
    borderRadius: 8,
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
    backgroundColor: '#FFFFFF00'
  },
  searchResultsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  searchResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});