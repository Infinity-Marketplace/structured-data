import { IOClients } from '@vtex/api'

import YotpoReviews from './yotpoReviews'

export class Clients extends IOClients {
  public get yotpoReviews() {
    return this.getOrSet('yotpoReviews', YotpoReviews)
  }
}
