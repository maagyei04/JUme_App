import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Address } from '@/types';
import { createAddress } from '@/api/address';
import RNPickerSelect from 'react-native-picker-select';

const AddressForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<Address>({
        user_id: '',
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
        }
    };

    return (
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
                    // Add more options as needed
                ]}
                style={pickerSelectStyles}
                value={address.region}
            />
            <Text style={styles.label}>City</Text>
            <RNPickerSelect
                onValueChange={(value) => handleChange('city', value)}
                items={[
                    { label: 'Select City', value: '' },
                    // Add more options as needed
                ]}
                style={pickerSelectStyles}
                value={address.city}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    label: {
        marginTop: 10,
        fontSize: 16
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8
    },
    inputAndroid: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8
    }
});

export default AddressForm;