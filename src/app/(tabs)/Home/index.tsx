import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function MenuScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>50% off in Apple Watch</Text>
        <TouchableOpacity style={styles.shopNowButton}>
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
        <Image source={require('@assets/images/watch.png')} style={styles.bannerImage} />
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.category}>
          <Image source={require('@assets/images/watch.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Wish List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Image source={require('@assets/images/watch.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Electronics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Image source={require('@assets/images/watch.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Bags</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Image source={require('@assets/images/watch.png')} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>Furniture</Text>
        </TouchableOpacity>
      </View>

      {/* Flash Sales */}
      <View style={styles.flashSales}>
        <Text style={styles.flashSalesText}>FLASH SALES</Text>
        <Text style={styles.flashSalesTimer}>TIME LEFT: 02d : 23h : 48m</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      {/* Latest Products */}
      <View style={styles.latestProducts}>
        <Text style={styles.latestProductsText}>Latest Products</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.products}>
        <View style={styles.product}>
          <Image source={require('@assets/images/watch.png')} style={styles.productImage} />
          <Text style={styles.productText}>Nike air jordan retro fas...</Text>
        </View>
        <View style={styles.product}>
          <Image source={require('@assets/images/watch.png')} style={styles.productImage} />
          <Text style={styles.productText}>Classic new black clas...</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#9824EC',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
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
  },
  shopNowText: {
    color: '#e7c5ff',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  category: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  flashSales: {
    backgroundColor: '#ff69b4',
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
    color: '#fff',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  product: {
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
});
