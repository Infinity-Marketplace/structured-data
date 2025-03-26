import type {
  Cached,
  ClientsConfig,
  ParamsContext,
  RecorderState,
  ServiceContext,
} from '@vtex/api'
import { LRUCache, Service, method } from '@vtex/api'

import { Clients } from './clients'
import { getProductRating } from './resolvers/getProductRating'
import ping from './middlewares/ping'

const TIMEOUT_MS = 3 * 1000
const TWO_HOURS_MS = 120 * 60 * 1000
const MAX_SIZE_FOR_CACHE = 20000

const yotpoCache = new LRUCache<string, Cached>({
  max: MAX_SIZE_FOR_CACHE,
  maxAge: TWO_HOURS_MS,
  ttl: TWO_HOURS_MS,
})

metrics.trackCache('yotpo', yotpoCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    yotpo: {
      retries: 1,
      concurrency: 10,
      memoryCache: yotpoCache,
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
