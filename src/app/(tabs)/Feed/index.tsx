import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';

const FeedScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Following');

  const feedItems = [
    {
      id: 1,
      seller: 'Kaylo Technologies',
      time: '6 hours ago',
      images: [require('@assets/images/watch.png'), require('@assets/images/watch.png'), require('@assets/images/watch.png')]
    },
    {
      id: 2,
      seller: 'Kaylo Technologies',
      time: '1 day ago',
      images: [require('@assets/images/watch.png'), require('@assets/images/watch.png'), require('@assets/images/watch.png')]
    },
    {
      id: 3,
      seller: 'Kaylo Technologies',
      time: '2 days ago',
      images: [require('@assets/images/watch.png'), require('@assets/images/watch.png'), require('@assets/images/watch.png')]
    }
  ];

  return (
    <ScrollView style={styles.container}>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable style={styles.tab} onPress={() => setSelectedTab('Following')}>
          <Text style={selectedTab === 'Following' ? styles.tabTextActive : styles.tabText}>Following</Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => setSelectedTab('Explore Ads')}>
          <Text style={selectedTab === 'Explore Ads' ? styles.tabTextActive : styles.tabText}>Explore Ads</Text>
        </Pressable>
      </View>

      {/* Feed Items based on selected tab */}
      {selectedTab === 'Following' && (
        feedItems.map(item => (
          <View key={item.id} style={styles.feedItem}>
            <View style={styles.feedHeader}>
              <Text style={styles.sellerBadge}>POPULAR SELLERS</Text>
              <Text style={styles.sellerName}>{item.seller}</Text>
              <Pressable style={styles.followButton}>
                <Text style={styles.followText}>Follow</Text>
              </Pressable>
            </View>
            <View style={styles.feedImages}>
              {item.images.map((image, index) => (
                <Image key={index} source={image} style={styles.feedImage} />
              ))}
            </View>
            <Text style={styles.feedDescription}>Check the latest arrivals</Text>
            <Text style={styles.feedTime}>{item.time}</Text>
            <Pressable style={styles.shareButton}>
              <Text style={styles.shareText}>SHARE</Text>
            </Pressable>
          </View>
        ))
      )}

      {selectedTab === 'Explore Ads' && (
        <View style={styles.exploreContainer}>
          <Text style={styles.exploreText}>Explore content goes here.</Text>
        </View>
      )}

    </ScrollView>
  );
};

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
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  tabTextActive: {
    fontSize: 16,
    color: '#FF007F',
    fontWeight: 'bold',
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sellerBadge: {
    backgroundColor: '#8E44AD',
    color: '#FFF',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  sellerName: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  followButton: {
    backgroundColor: '#FF007F',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  followText: {
    color: '#FFF',
    fontSize: 14,
  },
  feedImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  feedImage: {
    width: '32%',
    height: 100,
    borderRadius: 10,
  },
  feedDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  feedTime: {
    fontSize: 12,
    color: '#888',
  },
  shareButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  shareText: {
    color: '#FF007F',
    fontSize: 14,
  },
  exploreContainer: {
    margin: 10,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreText: {
    fontSize: 16,
    color: '#888',
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

export default FeedScreen;
