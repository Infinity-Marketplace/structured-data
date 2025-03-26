import type {
  ClientsConfig,
  ParamsContext,
  RecorderState,
  ServiceContext,
} from '@vtex/api'
import { Service, method } from '@vtex/api'

import { Clients } from './clients'
import ping from './middlewares/ping'
import { getProductRating } from './resolvers/getProductRating'

const TIMEOUT_MS = 1000

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  graphql: {
    resolvers: {
      Query: {
        getProductRating,
      },
    },
  },
  routes: {
    ping: method({
      GET: ping,
    }),
  },
})
