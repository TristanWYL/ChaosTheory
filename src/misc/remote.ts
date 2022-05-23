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
    return prices
        .filter(price=>price.symbol.startsWith('BTC'))
        .reduce((prev, curr) => {
            prev[curr.symbol] = Number(curr.price)
            return prev
        }, {} as { [k: string]: number })
}
