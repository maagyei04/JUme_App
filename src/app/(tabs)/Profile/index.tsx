import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome Joey</Text>
        <Text style={styles.emailText}>joey23@gmail.com</Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>MY JUME ACCOUNT</Text>
      <View style={styles.accountSection}>
        {[
          { label: 'Orders', icon: "isv" },
          { label: 'Inbox', icon: "inbox" },
          { label: 'Rating & Reviews', icon: "like2" },
          { label: 'Vouchers', icon: "tago" },
          { label: 'Saved Items', icon: "hearto" },
          { label: 'Follow Seller', icon: "addusergroup" },
          { label: 'Recently Viewed', icon: "find" },
          { label: 'Recently Searched', icon: "search1" },
        ].map((item, index) => (
          <Pressable key={index} style={styles.accountItem}>
            <AntDesign name={item.icon} size={24} style={styles.accountIcon} />
            <Text style={styles.accountText}>{item.label}</Text>
            <AntDesign name="doubleright" size={15} style={styles.arrowIcon} />
          </Pressable>
        ))}
      </View>

      {/* Settings Section */}
      <Text style={styles.sectionTitle}>MY SETTINGS</Text>
      <View style={styles.settingsSection}>
        {[
          { label: 'Address Book', icon: "contacts" },
          { label: 'Close Account', icon: "warning" },
        ].map((item, index) => (
          <Pressable key={index} style={styles.accountItem}>
            <AntDesign name={item.icon} size={24} style={styles.accountIcon} />
            <Text style={styles.accountText}>{item.label}</Text>
            <AntDesign name="doubleright" size={15} style={styles.arrowIcon} />
          </Pressable>
        ))}
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </Pressable>

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
    backgroundColor: '#E0C3F7',
    padding: 20,
  },
  welcomeText: {
    color: '#FF007F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailText: {
    color: '#000',
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
    color: '#FF007F',
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
