import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { session, profile } = useAuth();

  useEffect(() => {
    if (session) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [session, profile]);

  return (
    <ScrollView style={styles.container}>

      {/* Welcome Section */}
      {userLoggedIn &&
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.emailText}>{profile?.username}</Text>
          <Text style={styles.emailText2}>{profile?.email}</Text>
        </View>
      }

      {userLoggedIn === false &&
        <View style={styles.welcomeSection2}>
          <View>
            <Text style={styles.textContainer}>Welcome</Text>
            <Text style={styles.textContainer2}>Enter your account</Text>
          </View>
          <Link href={'/(auth)/AuthScreen/'} asChild>
            <Pressable style={styles.buttonStyle}>
              <Text style={styles.loginButton}>Login/SignUp</Text>
            </Pressable>
          </Link>
        </View>
      }

      {/* Account Section */}
      <Text style={styles.sectionTitle}>JUme ACCOUNT</Text>
      <View style={styles.accountSection}>
        {[
          { label: 'Orders', icon: "isv", url: '/profile/orders/' },
          { label: 'Inbox', icon: "inbox", url: '/profile/follow/' },
          { label: 'Rating & Reviews', icon: "like2", url: '/profile/inbox/' },
          { label: 'Vouchers', icon: "tago", url: '/profile/rating/' },
          { label: 'Saved Items', icon: "hearto", url: '/profile/saved/' },
          { label: 'Follow Seller', icon: "addusergroup", url: '/profile/vouchers/' },
        ].map((item, index) => (
          <Pressable key={index} style={styles.accountItem} onPress={() => { router.replace(item.url) }}>
            <AntDesign name={item.icon} size={24} style={styles.accountIcon} />
            <Text style={styles.accountText}>{item.label}</Text>
            <AntDesign name="doubleright" size={15} style={styles.arrowIcon} />
          </Pressable>
        ))}
      </View>

      {/* Settings Section */}
      <Text style={styles.sectionTitle}>SETTINGS</Text>
      <View style={styles.settingsSection}>
        {[
          { label: 'Address Book', icon: "contacts", url: '/profile/address/' },
        ].map((item, index) => (
          <Pressable key={index} style={styles.accountItem} onPress={() => { router.replace(item.url) }}>
            <AntDesign name={item.icon} size={24} style={styles.accountIcon} />
            <Text style={styles.accountText}>{item.label}</Text>
            <AntDesign name="doubleright" size={15} style={styles.arrowIcon} />
          </Pressable>
        ))}
      </View>

      {/* Logout Button */}
      {userLoggedIn &&
        <Pressable onPress={() => supabase.auth.signOut().then(() => router.push('/(auth)/GetStarted/'))} style={styles.logoutButton}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </Pressable>
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0C3F7',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 20,
  },
  welcomeSection: {
    backgroundColor: '#81008F',
    padding: 20,
  },
  welcomeSection2: {
    backgroundColor: '#81008F',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  textContainer: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  textContainer2: {
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  loginButton: {
    fontWeight: 'bold',
    color: '#81008F',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  emailText2: {
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  accountSection: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  accountIcon: {
    marginHorizontal: 20,
    color: '#000',
  },
  accountText: {
    flex: 1,
    fontSize: 16,
  },
  arrowIcon: {
    marginRight: 20,
    color: '#A0A0A0',
  },
  settingsSection: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  logoutButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#81008F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  activeIcon: {
    tintColor: '#FF007F',
  },
  activeText: {
    color: '#FF007F',
    fontWeight: 'bold',
  },
});