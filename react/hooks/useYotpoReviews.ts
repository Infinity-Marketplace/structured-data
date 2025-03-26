import { useQuery } from 'react-apollo'

import GET_PRODUCT_REVIEWS from '../queries/getYotpoAverageRating.graphql'

export function useYotpoReviews(productId: string | undefined) {
  const { data, loading, error } = useQuery(GET_PRODUCT_REVIEWS, {
    variables: { productId },
    ssr: false,
  })

  return {
    data,
    loading,
    error,
  }
}
