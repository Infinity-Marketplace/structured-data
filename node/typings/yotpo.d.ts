interface YotpoReviewsResponse {
  status: {
    code: number
    message: string
  }
  response: {
    bottomline: {
      total_review: number
      average_score: number
    }
    reviews: YotpoReview[]
  }
}

interface YotpoReview {
  score: number
  title: string
  content: string
  user: {
    display_name: string
  }
  created_at: string
}
