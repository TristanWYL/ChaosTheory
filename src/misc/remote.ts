import { Rate } from './types'
// import { state } from "./state"

const BASE_URL = 'https://api.binance.com'

export const getBTCExchangeRates: () => Promise<Rate> = async () => {
    const prices = (await fetch(`${BASE_URL}/api/v3/ticker/price`).then(
        (response) => response.json()
    )) as unknown as Array<{
        symbol: string
        price: string
    }>
    const rate = {} as { [k: string]: number }
    prices.filter((price=>price.symbol.startsWith('BTC'))).forEach(price => rate[price.symbol] = Number(price.price))
    return rate
}
