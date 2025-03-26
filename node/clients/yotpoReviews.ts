import type { IOContext, InstanceOptions } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class YotpoReviews extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://api-cdn.yotpo.com/v1/widget`, context, {
      ...options,
      headers: {
        ...options?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async getProductAverageRating(
    yotpoAuthToken: string,
    productId: string
  ): Promise<YotpoReviewsResponse> {
    return this.http.get(
      `/${yotpoAuthToken}/products/${productId}/reviews.json`
    )
  }
}
