import { formatError } from '../utils/formatError'

export const getProductRating = async (
  _: unknown,
  {
    productId,
  }: {
    productId: string
  },
  ctx: Context
) => {
  const {
    clients: { yotpoReviews, apps },
    vtex: { logger },
  } = ctx

  try {
    const { yotpoAuthToken } = await apps.getAppSettings(
      process.env.VTEX_APP_ID as string
    )

    if (!yotpoAuthToken) {
      logger.error({
        flow: 'getProductRating',
        message: 'No Yotpo Auth Token found',
        productId,
      })

      return {}
    }

    const productRes = await yotpoReviews.getProductAverageRating(
      yotpoAuthToken,
      productId
    )

    if (productRes?.status?.code !== 200) {
      logger.error({
        flow: 'getProductRating',
        message: 'Error getting product rating',
        productId,
        response: productRes,
      })

      return {}
    }

    const {
      total_review: totalReviews,
      average_score: averageScore,
    } = productRes.response?.bottomline

    const reviews = productRes.response?.reviews?.map(
      (review: YotpoReview) => ({
        ratingValue: review.score,
        reviewTitle: review.title,
        reviewText: review.content,
        reviewAuthor: review.user.display_name,
        reviewDate: review.created_at,
      })
    )

    return { totalReviews, averageScore, reviews }
  } catch (error) {
    logger.info({
      flow: 'getProductRating',
      message: 'Error getting product rating',
      productId,
      error: formatError(error),
    })
  }

  return {}
}
