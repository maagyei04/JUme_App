import React from 'react';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Link, Tabs, useRouter } from 'expo-router';
import { Pressable, View, TextInput, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { useCart } from '@/providers/CartProvider';

import Colors from '@constants/Colors';
import { useColorScheme } from '@components/useColorScheme';
import { useSearch } from '@/providers/SearchProvider';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

function CustomHeader() {
  const { setSearchTerm, setIsSearchFocused } = useSearch();
  const { items } = useCart();

  const itemCount = items.length;

  return (
    <View style={styles.headerContainer}>
      <SearchBar
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        onChangeText={setSearchTerm}
      />
      <Link href="/cart" asChild>
        <Pressable style={styles.cartIcon}>
          {({ pressed }) => (
            <View>
              <AntDesign name="shoppingcart" size={25} style={styles.icon} />
              {itemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
              )}
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="appstore-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="notification" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Help"
        options={{
          tabBarIcon: ({ color }) => <Feather name="help-circle" size={28} color={color} />,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  cartIcon: {
    padding: 5,
    position: 'relative',
  },
  icon: {
    width: 24,
    height: 24,
  },
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