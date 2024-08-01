import { supabase } from "@/lib/supabase";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { TextInput, View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { sendSMS } from "@/api/sms";
import { AuthApiError } from '@supabase/supabase-js';
import { upsertProfile } from "@/api/auth";

const SignUp = () => {
    const [hidden, setHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        try {
            const { error: signUpError, data: { user } } = await supabase.auth.signUp({
                email: email,
                password: password,
                phone: phoneNumber,
            });

            if (signUpError) throw signUpError;

            if (!user) throw new Error('User not created');

            await upsertProfile(user.id, username, email, phoneNumber);

            await sendSMS(username, phoneNumber);
            Alert.alert('Success', 'Account created successfully');
        } catch (error) {
            if (error instanceof AuthApiError && error.status === 500) {
                console.error('Supabase AuthApiError:', error.message, error.status);
                Alert.alert('Sign-up Error', 'There was an issue creating your account on our server. Please try again later.');
            } else if (error instanceof AuthApiError) {
                console.error('Supabase AuthApiError:', error.message, error.status);
                Alert.alert('Sign-up Error', 'There was an issue creating your account. Please try again later.');
            } else {
                console.error('Unexpected error during sign-up:', error);
                Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
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
            <Text style={styles.title}>Sign up to get <Text style={styles.highlight}>15% off</Text> your first order</Text>

            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                style={styles.input}
            />

            <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+233541190955"
                style={styles.input}
            />

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
                    placeholder="Password"
                    secureTextEntry={hidden}
                />
                <Ionicons onPress={showPassword} name={hidden ? 'eye' : 'eye-off'} size={24} color="black" style={styles.icon} />
            </View>

            <Text style={styles.termsText}>Terms of Use and Privacy Policy</Text>

            <Pressable onPress={signUpWithEmail} disabled={loading} style={styles.button}>
                <Text style={styles.buttonText}>{loading ? 'Please wait...' : 'Sign Up'}</Text>
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
        marginLeft: 20,
    },
    footerText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    footerLink: {
        color: '#A146E2',
    },
    forgotPasswordText: {
        textAlign: 'right',
        color: 'blue',
        marginBottom: 20,
    },
});


export default SignUp;