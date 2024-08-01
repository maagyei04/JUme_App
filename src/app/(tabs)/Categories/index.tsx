import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native';
import { fetchCategories } from '@/api/categories';
import { fetchProductsByCategory } from '@/api/products';

interface Product {
  name: string;
  image: any;
}

export default function CategoryScreen() {
  const { data: categories, isLoading, error } = fetchCategories();

  console.log('p:', categories);

  const [selectedCategory, setSelectedCategory] = useState<string>('Grocery');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.leftContainer}>
        {categories && categories.map(category => (
          <Pressable key={category.id} style={[styles.category, selectedCategory === category.name && styles.selectedCategoryContainer]} onPress={() => setSelectedCategory(category.name)}>
            <Text style={[styles.categoryText, selectedCategory === category.name && styles.selectedCategoryText]}>
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.rightContainer}>
        {fetchProductsByCategory(selectedCategory).isLoading ? (
          <Text>Loading...</Text>
        ) : fetchProductsByCategory(selectedCategory).error ? (
          <Text>Error loading products</Text>
        ) : (
          <FlatList
            data={fetchProductsByCategory(selectedCategory).data}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.product}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productText}>{item.name}</Text>
              </View>
            )}
          />
        )}
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
