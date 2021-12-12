import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type Maybe<T> = T | null;

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  ProductDetailsModal: ModalParamList;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
  ShoppingCart: undefined;
};

export type ModalParamList = {
  id: string;
  name: string;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type Query = {
  __typename?: 'Query';
  favorites?: Maybe<Array<Favorite>>;
  products?: Maybe<Array<Product>>;
  product?: Maybe<Array<Product>>;
}

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  favoriteId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  price: Scalars['String'];
}

export type AllFavoriteMutationVariables = Exact<{ productId: Scalars['ID'] }>

export type AllFavoriteMutation = {
  __typename?: 'Mutation'
  addFavorite?:
  | {
    __typename?: 'Favorite';
    id: string;
    product: {
      __typename: 'Product';
      id: string;
      name: string;
    };
  }
  | null
  | undefined;
};

export type ProductSummaryFieldsFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  price: string;
  image: string;
  favoriteId?: string | null | undefined;
}

export type AllProductsQueryVariables = Exact<{ [key: string]: never }>

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite?: Maybe<Favorite>;
  removeFavorite?: Maybe<Scalars['Boolean']>;
}

export type MutationAddFavoriteArgs = {
  ProductId: Scalars['ID']
}

export type MutationRemoveFavoriteArgs = {
  favoriteId: Scalars['ID']
}

export type Favorite = {
  __typename?: 'Favorite';
  id: Scalars['ID'];
  product: Product;
}

export type AllFavoritesQueryVariables = Exact<{ [key: string]: never }>

export type AllFavoritesQuery = {
  __typename?: 'Query'
  favorites?:
  Array<{
    __typename?: 'Favorite';
    id: string;
    product: {
      __typename: 'Product';
      id: string;
      name: string;
      price: string;
      image: string;
      favoritemarId?: string | null | undefined;
    };
  }>
  | null
  | undefined;
};
