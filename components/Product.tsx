import * as React from 'react';
import { StyleSheet, Pressable, View, ActivityIndicator, Image } from 'react-native';
import { Text } from './Themed';
import { useNavigation } from '@react-navigation/core';
import { ProductSummaryFieldsFragment } from '../types';
import { gql, useMutation } from 'urql';
import { AllFavoriteMutation, AllFavoriteMutationVariables } from '../types';
import { AntDesign } from '@expo/vector-icons';

const ADD_FAVORITE_MUTATION = gql`
    mutation AddFavorite($productId: ID!) {
        addFavorite(productId: $productId) {
            id
            product {
                id
                name
                favoriteId
            }
        }
    } 
`;

const REMOVE_FAVORITE_MUTATION = gql`
    mutation RemoveFavorite($favoriteId: ID!) {
        removeFavorite(favoriteId: $favoriteId)
    } 
`;

export const Product: React.FC<{ item: ProductSummaryFieldsFragment; cta: 'add' | 'remove' }> = ({ item, cta }) => {
    const navigation = useNavigation();

    const [{ fetching: isAddingFavorite }, addFavorite] = useMutation<AllFavoriteMutation, AllFavoriteMutationVariables>(ADD_FAVORITE_MUTATION);

    const [{ fetching: isRemovingFavorite }, removeFavorite] = useMutation(REMOVE_FAVORITE_MUTATION);

    return (
        <Pressable onPress={() => navigation.navigate('ProductDetailsModal', { id: item.id, name: item.name })}>
            <View style={styles.container}>
                <Text style={styles.name}>{item.name}</Text>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                {!item.favoriteId && !isAddingFavorite && cta === 'add' ? (
                    <Pressable onPress={() => addFavorite({ productId: item.id })}>
                        <AntDesign name="hearto" size={24} color="black" />
                    </Pressable>
                ) : null}
                {item.favoriteId && !isRemovingFavorite && cta === 'remove' ? (
                    <Pressable onPress={() => removeFavorite({ favoriteId: item.favoriteId })}>
                        <AntDesign name="heart" size={24} color="red" />
                    </Pressable>
                ) : null}
                {isAddingFavorite || isRemovingFavorite ? <ActivityIndicator /> : null}
                <Text style={styles.summary}>{item.price}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        fontSize: 18,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 2,
        width: '50%'
    },
    summary: {
        fontSize: 18,
        color: 'lightgray',
    },
});
