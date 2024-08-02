import { supabase } from "@/lib/supabase";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";

const LogIn = () => {
    const [hidden, setHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error('Supabase error:', error);
                Alert.alert('Error', error.message);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            Alert.alert('Error', 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    const showPassword = () => {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.highlight}>Welcome !</Text>
            <Text style={styles.title}>Log into your account</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@gmail.com"
                style={styles.input}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password..."
                    secureTextEntry={hidden}
                />
                <Ionicons onPress={showPassword} name={hidden ? 'eye' : 'eye-off'} size={24} color="black" style={styles.icon} />
            </View>

            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>

            <Text style={styles.termsText}>Terms of Use and Privacy Policy</Text>

            <Pressable onPress={signInWithEmail} disabled={loading} style={styles.button}>
                <Text style={styles.buttonText}>{loading ? 'Please wait...' : 'Sign In'}</Text>
            </Pressable>

            <Text style={styles.orText}>- OR Continue with -</Text>

            <View style={styles.socialButtonsContainer}>
                <AntDesign name="google" size={30} color="red" />
                <AntDesign name="apple1" size={30} color="black" style={styles.socialIcon} />
                <AntDesign name="facebook-square" size={30} color="blue" style={styles.socialIcon} />
            </View>

            <Link href={'/(tabs)/Home/'} asChild><Text style={styles.termsText}>Skip</Text></Link>

        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    highlight: {
        color: '#A146E2',
        fontSize: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10,
    },
    icon: {
        marginLeft: 'auto',
    },
    termsText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: '#A146E2',
    },
    button: {
        backgroundColor: '#81008F',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginLeft: 20,
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
        color: '#A146E2',
        marginBottom: 20,
    },
});

export default LogIn;