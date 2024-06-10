import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable, View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '@constants/Colors';
import { useColorScheme } from '@components/useColorScheme';
import { useClientOnlyValue } from '@components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

function CustomHeader() {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchItem}>
        <TouchableOpacity style={styles.cartIcon}>
          <AntDesign name="search1" size={25} style={styles.icon} />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.cartIcon}>
          <AntDesign name="camerao" size={25} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Link href="/cart" asChild>
        <Pressable style={styles.cartIcon}>
          {({ pressed }) => (
            <AntDesign name="shoppingcart" size={25} style={styles.icon} />
          )}
        </Pressable>
      </Link>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/'} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        header: CustomHeader,
      }}>
      <Tabs.Screen name='index' options={{ href: null }} />
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Categories"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="notification" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Help"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    marginTop: 35,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  searchItem: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
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
    backgroundColor: '#e7c5ff',
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
