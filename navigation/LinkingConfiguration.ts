import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
            },
          },
          Favorites: {
            screens: {
              FavoritesScreen: 'two',
            },
          },
          ShoppingCart: {
            screens: {
              FavoritesScreen: 'three',
            },
          },
        },
      },
      ProductDetailsModal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
