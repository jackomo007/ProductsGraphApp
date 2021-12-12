import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { gql, useQuery } from 'urql';
import { ProductSummaryFields } from '../graphql/fragments';
import {Product} from '../components/Product'

const PRODUCTS_QUERY = gql`
  query AllProducts {
    products {
      ...ProductSummaryFields
    }
  }

  ${ProductSummaryFields}
`;

export const HomeScreen: React.FC = () => {
  const [{ data, error, fetching }, refreshProducts] = useQuery({ query: PRODUCTS_QUERY });
  const [isRefreshing, SetIsRefreshing] = React.useState(false);

  const handleRefreshProducts = React.useCallback(() => {
    SetIsRefreshing(true);
    refreshProducts({ requestPolicy: 'network-only'});
  }, [refreshProducts]);

  React.useEffect(() => {
    if(!fetching) {
      SetIsRefreshing(false);
    }
  }, [fetching])

  if (fetching && !isRefreshing) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Our Products</Text>
      <FlatList data={data?.products}
        refreshing={isRefreshing}
        onRefresh={handleRefreshProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.gridViewBlockStyle}>
         <Product item={item} cta='add'/>
         </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  name: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
    textAlign: 'center'
  },
  gridViewBlockStyle: {
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 300,
    width: 200,
    padding: 10,
  }
});
