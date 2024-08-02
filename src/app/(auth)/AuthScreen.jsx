import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import SignUp from './sign-up';
import LogIn from './sign-in';

const AuthScreen = () => {
    const [selectedTab, setSelectedTab] = useState('SignUp');

    return (
        <ScrollView style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabs}>
                <Pressable style={styles.tab} onPress={() => setSelectedTab('SignUp')}>
                    <Text style={selectedTab === 'SignUp' ? styles.tabTextActive : styles.tabText}>Sign up</Text>
                </Pressable>
                <Pressable style={styles.tab} onPress={() => setSelectedTab('LogIn')}>
                    <Text style={selectedTab === 'LogIn' ? styles.tabTextActive : styles.tabText}>Log in</Text>
                </Pressable>
            </View>

            {/* Content based on selected tab */}
            {selectedTab === 'SignUp' && <SignUp />}
            {selectedTab === 'LogIn' && <LogIn />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 5,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 0,
        borderBottomColor: '#DDD',
        marginVertical: 50,
    },
    tab: {
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 18,
        color: '#888',
    },
    tabTextActive: {
        fontSize: 18,
        color: '#81008F',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    highlight: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    icon: {
        marginLeft: 'auto',
    },
    termsText: {
        textAlign: 'center',
        marginBottom: 20,
        color: 'blue',
    },
    button: {
        backgroundColor: '#FF007F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialIcon: {
        marginLeft: 10,
    },
    footerText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    footerLink: {
        color: 'blue',
    },
    forgotPasswordText: {
        textAlign: 'right',
        color: 'blue',
        marginBottom: 20,
    },
});



export default AuthScreen;
