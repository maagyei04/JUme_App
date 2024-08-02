import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Address } from '@/types';
import { createAddress } from '@/api/address';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';

const AddressForm = () => {
    const { profile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<Address>({
        user_id: profile?.id || '',
        first_name: '',
        last_name: '',
        phone_number: '',
        phone_number_2: '',
        address: '',
        additional_info: '',
        region: '',
        city: '',
        country: '',
    });

    const handleChange = (name: string, value: string) => {
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handleSubmit = () => {
        setLoading(true);
        try {
            createAddress(address);
            console.log('Form submitted:', address);
        } catch (error) {
            console.log('error:', error);
        } finally {
            setLoading(false);
            router.push('/checkout/delivery');
        }
    };

    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={address.first_name}
                    onChangeText={(value) => handleChange('first_name', value)}
                />
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={address.last_name}
                    onChangeText={(value) => handleChange('last_name', value)}
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={address.phone_number}
                    onChangeText={(value) => handleChange('phone_number', value)}
                />
                <Text style={styles.label}>Additional Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={address.phone_number_2}
                    onChangeText={(value) => handleChange('phone_number_2', value)}
                />
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address.address}
                    onChangeText={(value) => handleChange('address', value)}
                />
                <Text style={styles.label}>Additional Information</Text>
                <TextInput
                    style={styles.input}
                    value={address.additional_info}
                    onChangeText={(value) => handleChange('additional_info', value)}
                />
                <Text style={styles.label}>Region</Text>
                <RNPickerSelect
                    onValueChange={(value) => handleChange('region', value)}
                    items={[
                        { label: 'Select Region', value: '' },
                        { label: 'Greater Accra Region', value: 'Greater_Accra_Region' },
                        { label: 'Central Region', value: 'Central_Region' },
                        { label: 'Oti Region', value: 'Oti_Region' },
                        { label: 'Volta Region', value: 'Volta_Region' },
                        { label: 'Northern Region', value: 'Northern_Region' },
                        { label: 'Savannah Region', value: 'Savannah_Region' },
                        { label: 'Ashanti Region', value: 'Ashanti_Region' },
                        { label: 'Western Region', value: 'Western_Region' },
                        { label: 'Upper East Region', value: 'Upper_East_Region' },
                        { label: 'Upper West Region', value: 'Upper_West_Region' },
                        { label: 'Eastern Region', value: 'Eastern_Region' },
                        { label: 'Bono East Region', value: 'Bono_East_Region' },
                        { label: 'Bono West Region', value: 'Bono_West_Region' },
                    ]}
                    style={pickerSelectStyles}
                    value={address.region}
                />
                <Text style={styles.label}>City</Text>
                <TextInput
                    style={styles.input}
                    value={address.city}
                    onChangeText={(value) => handleChange('city', value)}
                />
                <Text style={styles.label}>Country</Text>
                <TextInput
                    style={styles.input}
                    value={address.country}
                    onChangeText={(value) => handleChange('country', value)}
                />
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Please wait...' : "Submit"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white'
    },
    label: {
        marginTop: 10,
        fontSize: 16
    },
    input: {
        height: 50,
        marginBottom: 10,
        borderWidth: 0.4,
        paddingLeft: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: -3,
            height: 5
        }
    },
    buttonStyle: {
        backgroundColor: '#81008F',
        paddingVertical: 20,
        paddingHorizontal: 90,
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.3,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {
            height: 5,
            width: -3
        }
    },
    inputAndroid: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.3,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 8,
        shadowOffset: {
            height: 5,
            width: -3
        }
    },
});

export default AddressForm;