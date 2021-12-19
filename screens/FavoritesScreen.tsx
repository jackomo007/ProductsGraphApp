import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useQuery } from 'urql';
import { AllFavoritesQuery, AllFavoritesQueryVariables } from '../types';
import { Product } from '../components/Product';
import { FAVORITES_QUERY } from '../graphql/queries';


export const FavoritesScreen: React.FC = () => {
  const [{ data, error, fetching }, refreshFavorites] = useQuery<AllFavoritesQuery, AllFavoritesQueryVariables>({ query: FAVORITES_QUERY });
  const [isRefreshing, SetIsRefreshing] = React.useState(false);

  const handleRefreshFavorites = React.useCallback(() => {
    SetIsRefreshing(true);
    refreshFavorites({ requestPolicy: 'network-only'});
  }, [refreshFavorites]);

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
      <FlatList data={data?.favorites}
        refreshing={isRefreshing}
        onRefresh={handleRefreshFavorites}
        keyExtractor={item => item.id}
        ItemSeparatorComponent ={() => <View style= {styles.separator}/>}
        renderItem={({ item }) => (
          <Product item={item.product} cta='remove'/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10
  },
  author: {
    fontSize: 18,
    color: 'lightgray',
  },
  separator: {
    marginVertical: 14,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: 'white',
    width: '90%'
  },
});