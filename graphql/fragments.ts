import { gql } from 'urql';

export const ProductSummaryFields = gql`
    fragment ProductSummaryFields on Product {
        id
        name
        image
        price
        favoriteId
    }
`;