import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Switch, Linking, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function HelpScreen() {
  const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsPushNotificationsEnabled(previousState => !previousState);

  const openWhatsApp = async () => {
    try {
      const whatsAppNumber = '+233541190955';
      const whatsAppUrl = `whatsapp://send?phone=${whatsAppNumber}`;

      const isWhatsAppInstalled = await Linking.canOpenURL(whatsAppUrl);
      if (isWhatsAppInstalled) {
        await Linking.openURL(whatsAppUrl);
      } else {
        const webUrl = `https://wa.me/${whatsAppNumber}`;
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>

      {/* Live Chat Button */}
      <TouchableOpacity style={styles.liveChatButton} onPress={openWhatsApp}>
        <Text style={styles.liveChatText}>Start Live Chat</Text>
        <FontAwesome name="whatsapp" size={24} color="white" />
      </TouchableOpacity>

      {/* About Jume Section */}
      <Text style={styles.sectionTitle}>ABOUT JUME</Text>
      <View style={styles.section}>
        {[
          { label: 'Jume Services', icon: require('@assets/images/watch.png') },
          { label: 'Faq', icon: require('@assets/images/watch.png') },
          { label: 'Privacy Policy', icon: require('@assets/images/watch.png') },
        ].map((item, index) => (
          <Pressable key={index} style={styles.item}>
            <Text style={styles.itemText}>{item.label}</Text>
            <AntDesign name="doubleright" size={15} style={styles.icon} />
          </Pressable>
        ))}
      </View>

      {/* Settings Section */}
      <Text style={styles.sectionTitle}>SETTINGS</Text>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Push Notifications</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={isPushNotificationsEnabled}
          />
        </View>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Country</Text>
          <Text style={styles.subText}>GHANA</Text>
          <AntDesign name="doubleright" size={15} style={styles.icon} />
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Language</Text>
          <Text style={styles.subText}>ENGLISH</Text>
          <AntDesign name="doubleright" size={15} style={styles.icon} />
        </Pressable>
      </View>

      {/* App Info Section */}
      <Text style={styles.sectionTitle}>APP INFO</Text>
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.itemText}>App Version 12.15.0</Text>
          <Text style={styles.subText}>UP TO DATE</Text>
        </View>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Cache Used: 101 KB</Text>
          <Text style={styles.subText}>CLEAR</Text>
        </Pressable>
      </View>

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
    marginHorizontal: 10,
    color: '#A0A0A0',
  },
  liveChatButton: {
    backgroundColor: '#81008F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  liveChatText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  sectionTitle: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  section: {
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  subText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginRight: 10,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginRight: 20,
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
