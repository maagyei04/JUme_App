import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Stack.Screen options={{
                title: 'Product Details: ' + id,
                headerRight: () => {
                    return <Link href="/cart" asChild>
                        <Pressable style={styles.cartIcon}>
                            {({ pressed }) => (
                                <AntDesign name="shoppingcart" size={25} style={styles.icon} />
                            )}
                        </Pressable>
                    </Link>;
                }
            }} />

            <Text>ProductDetailsScreen</Text>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    cartIcon: {
        marginRight: 15,
    },
    icon: {
        width: 24,
        height: 24,
    },
})