import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Text, Alert } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useSearch } from '@/providers/SearchProvider';
import { useCart } from '@/providers/CartProvider';
import * as ImagePicker from 'expo-image-picker';

interface SearchBarProps {
    onFocus?: () => void;
    onBlur?: () => void;
    onChangeText: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocus, onBlur, onChangeText }) => {
    const { searchTerm, setSearchTerm } = useSearch();

    const onSubmit = () => {
        onChangeText(searchTerm);
    };

    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need camera and photo library permissions to make this work!');
            return false;
        }
        return true;
    };

    const handleImagePick = async () => {
        const permissionGranted = await requestPermissions();
        if (!permissionGranted) return;

        Alert.alert(
            "Choose an option",
            "Would you like to take a photo or select one from your gallery?",
            [
                {
                    text: "Take Photo",
                    onPress: () => launchCamera(),
                },
                {
                    text: "Choose from Gallery",
                    onPress: () => launchImageLibrary(),
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    };

    const launchCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Handle the captured image
            console.log(result.assets[0].uri);
        }
    };

    const launchImageLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // Handle the selected image
            console.log(result.assets[0].uri);
        }
    };

    const handleVoiceInput = () => {
        // Implement voice input functionality here
        console.log('Voice input activated');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onSubmit} style={styles.searchButton}>
                <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search products here..."
                returnKeyType="search"
                onSubmitEditing={onSubmit}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <TouchableOpacity style={styles.iconButton} onPress={handleVoiceInput}>
                <FontAwesome name="microphone" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleImagePick}>
                <AntDesign name="camera" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 5,
        margin: 10,
    },
    input: {
        flex: 0.8,
        padding: 10,
    },
    searchButton: {
        padding: 10,
    },
    iconButton: {
        padding: 10,
    },
});


export default SearchBar;