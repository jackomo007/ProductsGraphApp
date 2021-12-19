import * as React from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ActivityIndicator, ScrollView, StyleSheet, Image } from 'react-native';
import { useQuery } from 'urql';
import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { PRODUCT_BY_ID } from '../graphql/queries';
export const ProductDetailsModalScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetailsModal'>>();
  const [{ data, error, fetching }] = useQuery({ query: PRODUCT_BY_ID, variables: { id: route.params.id } });

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: data.product.image }} style={{ width: 300, height: 300, borderRadius: 150, marginLeft: '10%' }} />
        <Text style={styles.name}>{data.product.name}</Text>
        <Text style={styles.description}>{data.product.description}</Text>
        <View style={styles.optionsColor}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Avaliable Color:</Text>
          <View style={{ backgroundColor: 'black', width: 30, height: 30, borderRadius: 50 }}></View>
          <View style={{ backgroundColor: 'green', width: 30, height: 30, borderRadius: 50 }}></View>
          <View style={{ backgroundColor: 'gray', width: 30, height: 30, borderRadius: 50 }}></View>
          <View style={{ backgroundColor: 'red', width: 30, height: 30, borderRadius: 50 }}></View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{data.product.price}</Text>
          <View style={styles.buttonCart}>
            <Text style={styles.textCart}>
              <AntDesign name="shoppingcart" size={24} color="#4630EB" /> Add to cart</Text>
          </View>
        </View>
      </ScrollView>
    </View>

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
    color: '#4630EB',
  },
  description: {
    fontSize: 18,
    fontWeight: '100',
    fontStyle: 'italic',
    marginBottom: 15,
    color: 'gray'
  },
  optionsColor: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonCart: {
    backgroundColor: 'lightgray',
    borderRadius: 50,
    height: 40,
    width: 160
  },
  textCart: {
    color: '#4630EB',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 4
  },
  price: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 25,
    marginTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
