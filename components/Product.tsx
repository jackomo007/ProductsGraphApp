import * as React from 'react';
import { StyleSheet, Pressable, View, ActivityIndicator, Image, Button, TouchableHighlight } from 'react-native';
import { Text } from './Themed';
import { useNavigation } from '@react-navigation/core';
import { ProductSummaryFieldsFragment } from '../types';
import { useMutation } from 'urql';
import { AllFavoriteMutation, AllFavoriteMutationVariables, AllCartMutation, AllCartMutationVariables } from '../types';
import { AntDesign } from '@expo/vector-icons';
import { ADD_FAVORITE_MUTATION, REMOVE_FAVORITE_MUTATION, ADD_CART_MUTATION, REMOVE_CART_MUTATION } from '../graphql/queries';

export const Product: React.FC<{ item: ProductSummaryFieldsFragment; cta: 'add' | 'remove' }> = ({ item, cta }) => {
    const navigation = useNavigation();

    const [{ fetching: isAddingFavorite }, addFavorite] = useMutation<AllFavoriteMutation, AllFavoriteMutationVariables>(ADD_FAVORITE_MUTATION);
    const [{ fetching: isRemovingFavorite }, removeFavorite] = useMutation(REMOVE_FAVORITE_MUTATION);

    const [{ fetching: isAddingToCart }, addToCart] = useMutation<AllCartMutation, AllCartMutationVariables>(ADD_CART_MUTATION);
    const [{ fetching: isRemovingFromCard }, removeFromCard] = useMutation(REMOVE_CART_MUTATION);

    return (
        <Pressable onPress={() => navigation.navigate('ProductDetailsModal', { id: item.id, name: item.name })}>
            <View style={styles.container}>
                <View style={styles.row}>
                    {isAddingFavorite || isRemovingFavorite || isAddingToCart || isRemovingFromCard ? <ActivityIndicator /> : null}
                    {!item.favoriteId && !isAddingFavorite ? (
                        <Pressable onPress={() => addFavorite({ productId: item.id })}>
                            <AntDesign name="hearto" size={24} color="black" />
                        </Pressable>
                    ) : null}
                    {item.favoriteId && !isRemovingFavorite ? (
                        <Pressable onPress={() => removeFavorite({ favoriteId: item.favoriteId })}>
                            <AntDesign name="heart" size={24} color="red" />
                        </Pressable>
                    ) : null}
                </View>
                <View style={styles.image}>
                    <Image source={{ uri: item.image }} style={{ width: 110, height: 110 }} />
                </View>
                <View style={styles.text}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.summary}>{item.price}</Text>
                </View>
                {!item.shoppingCartId && !isAddingToCart ? (
                    <TouchableHighlight onPress={() => addToCart({ productId: item.id })}>
                        <View style={{ width: 130, height: 50, backgroundColor: 'black', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>Add to Cart</Text>
                        </View>
                    </TouchableHighlight>
                ) : null}
                {item.shoppingCartId && !isRemovingFromCard ? (
                    <TouchableHighlight onPress={() => removeFromCard({ shoppingCartId: item.shoppingCartId })}>
                        <View style={{ width: 140, height: 50, backgroundColor: 'red', borderRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Remove from Cart</Text>
                        </View>
                    </TouchableHighlight>
                ) : null}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        padding: 10,
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 45,
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 45
    },
    text: {
        height: 130,
        alignItems: 'center',
        marginBottom: 15
    },
    name: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '400',
        textTransform: 'uppercase',
    },
    summary: {
        fontSize: 20,
        color: '#4630EB',
    },
});
