import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native';

interface Product {
  name: string;
  image: any; // You can change 'any' to the specific type if you know it (e.g., ImageSourcePropType)
}

const categories = [
  'Grocery', 'Health & Beauty', 'Home & Office', 'Phones & Tablets', 'Computing',
  'Electronics', 'Fashion', 'Gaming', 'Baby Product', 'Sporting Goods', 'Books',
  'Toys & Games', 'Miscellaneous'
];

const products: { [key: string]: Product[] } = {
  'Grocery': [
    { name: 'Tomato paste', image: require('@assets/images/watch.png') },
    { name: 'Safari puffs', image: require('@assets/images/watch.png') },
    // Add more products here...
  ],
  'Health & Beauty': [
    { name: 'Product 1', image: require('@assets/images/watch.png') },
    { name: 'Product 2', image: require('@assets/images/watch.png') },
    // Add more products here...
  ],
  // Add more categories and products here...
};

export default function CategoryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Grocery');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.leftContainer}>
        {categories.map(category => (
          <Pressable key={category} style={[styles.category, selectedCategory === category && styles.selectedCategoryContainer]} onPress={() => setSelectedCategory(category)}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.rightContainer}>
        <FlatList
          data={products[selectedCategory]}
          keyExtractor={(item) => item.name}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productText}>{item.name}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
  },
  leftContainer: {
    width: '30%',
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
  },
  rightContainer: {
    width: '70%',
    backgroundColor: '#fff',
    padding: 10,
  },
  category: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fffffffff'
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    color: '#000',
  },
  selectedCategoryContainer: {
    backgroundColor: '#fffffff',
    padding: 5,
  },
  product: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productImage: {
    width: 50,
    height: 50,
  },
  productText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});
