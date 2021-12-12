import * as React from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Image } from 'react-native';
import { gql, useQuery } from 'urql';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';

const PRODUCT_BY_ID = gql`
query ProductByID ($id: ID!) {
  product (id: $id) {
    id
    name
		image
		price
		description
  }
}
`;

export const ProductDetailsModalScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetailsModal'>>();
  const [{ data, error, fetching }] = useQuery({ query: PRODUCT_BY_ID, variables: {id: route.params.id} });
  
  if (fetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="grey"></ActivityIndicator>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Houston, we have a problem {error.message}</Text>
      </View>
    )
  }

  if (!data?.product) {
    return (
      <View style={styles.container}>
        <Text>It seems to be somenthing missing...</Text>
      </View>
    )
  }
  
  return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.name}>{data.product.name}</Text>
        <Image source={{ uri: data.product.image }} style={{ width: 300, height: 300 }} />
        <Text style={styles.description}>{data.product.description}</Text>
        <Text style={styles.price}>It can be yours for {data.product.price}</Text>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 20
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'lightgray'
  },
  description: {
    fontSize: 18,
    fontWeight: '100',
    fontStyle: 'italic',
    marginBottom: 15,
    color: 'gray'
  },
  price: {
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 25
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
