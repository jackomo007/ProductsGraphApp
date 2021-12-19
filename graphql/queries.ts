import { gql } from 'urql';
import { ProductSummaryFields } from '../graphql/fragments';

export const PRODUCTS_QUERY = gql`
  query AllProducts {
    products {
      ...ProductSummaryFields
    }
  }

  ${ProductSummaryFields}
`;

export const PRODUCT_BY_ID = gql`
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

export const FAVORITES_QUERY = gql`
  query AllFavorites {
    favorites {
      id
      product {
        ...ProductSummaryFields
      }
    }

    ${ProductSummaryFields}
  }
`;

export const ADD_FAVORITE_MUTATION = gql`
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

export const REMOVE_FAVORITE_MUTATION = gql`
    mutation RemoveFavorite($favoriteId: ID!) {
        removeFavorite(favoriteId: $favoriteId)
    } 
`;

export const CART_QUERY = gql`
  query GetShoppingCart {
    shoppingCart {
      id
      product {
        ...ProductSummaryFields
      }
    }

    ${ProductSummaryFields}
  }
`;

export const ADD_CART_MUTATION = gql`
    mutation AddToCart($productId: ID!) {
        addToCart(productId: $productId) {
            id
            product {
                id
                name
                shoppingCartId
            }
        }
    } 
`;

export const REMOVE_CART_MUTATION = gql`
    mutation RemoveFromCart($shoppingCartId: ID!) {
        removeFromCart(shoppingCartId: $shoppingCartId)
    } 
`;