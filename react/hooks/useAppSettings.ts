import { useQuery } from 'react-apollo'

import GET_SETTINGS from '../queries/getSettings.graphql'

const DEFAULT_DISABLE_OFFERS = false
const DEFAULT_DECIMALS = 2
const DEFAULT_PRICES_WITH_TAX = false
const DEFAULT_USE_SELLER_DEFAULT = false
const DEFAULT_USE_PRODUCT_GROUP = true

interface Settings {
  disableOffers: boolean
  decimals: number
  pricesWithTax: boolean
  useSellerDefault: boolean
  useProductGroup: boolean
}

const useAppSettings = (): Settings => {
  const { data } = useQuery(GET_SETTINGS, { ssr: false })

  if (data?.publicSettingsForApp?.message) {
    const {
      decimals,
      disableOffers,
      pricesWithTax,
      useSellerDefault,
      useProductGroup,
    } = JSON.parse(data.publicSettingsForApp.message)

    return {
      disableOffers: disableOffers || DEFAULT_DISABLE_OFFERS,
      decimals: decimals || DEFAULT_DECIMALS,
      pricesWithTax: pricesWithTax || DEFAULT_PRICES_WITH_TAX,
      useSellerDefault: useSellerDefault || DEFAULT_USE_SELLER_DEFAULT,
      useProductGroup: useProductGroup || false,
    }
  }

  return {
    disableOffers: DEFAULT_DISABLE_OFFERS,
    decimals: DEFAULT_DECIMALS,
    pricesWithTax: DEFAULT_PRICES_WITH_TAX,
    useSellerDefault: DEFAULT_USE_SELLER_DEFAULT,
    useProductGroup: DEFAULT_USE_PRODUCT_GROUP,
  }
}

export default useAppSettings
