import { Rate } from "./types"
import { state } from "./state"

const BASE_URL = 'https://api.binance.com'
const BASE_URL_WS = 'wss://stream.binance.com:9443'

export const getBTCExchangeRates: ()=>Promise<Rate> = async () => {
  const prices = (await fetch(`${BASE_URL}/api/v3/ticker/price`).then(response=>response.json())) as unknown as Array<{
    symbol:string,
    price: string
  }>
  const rate = {} as {[k: string]:number}
  prices.forEach(price => {
    if(price.symbol.startsWith('BTC')){
      rate[price.symbol] = Number(price.price)
    }
  })
  return rate
}

export type History = Array<{"openTime":number, "openPrice": number}>
export const getHistoryBySymbol: (symbol:string)=>Promise<History> = async (symbol) => {
  const klines = (await fetch(`${BASE_URL}/api/v3/klines?` + new URLSearchParams({symbol: symbol, interval: '6h', limit:'100'})).then(response=>response.json())) as unknown as Array<Array<number | string>>
  const history: History = []
  klines.forEach(kline=>{history.push({
      openTime: kline[0] as number,
      openPrice: Number(kline[1])
    })})
  return history
}

export const getAvgPrices: ()=>Promise<{[k: string]:string}> = async () => {
  const avgs:{[k: string]:string} = {}
  await getSymbols().then(async symbols=>{
    await Promise.all(symbols.map(async symbol=>{
    const avg = (await fetch(`${BASE_URL}/api/v3/avgPrice?` + new URLSearchParams({symbol: symbol})).then(response=>response.json())) as unknown as {mins:number,price:string}
    avgs[symbol] = avg.price
  }))
  })
  return avgs
}

export const getSymbols:()=>Promise<Array<string>> = ()=>{
  if(Object.keys(state.rateSet).length === 0){
    return getBTCExchangeRates().then(rateSet=>Object.keys(rateSet))
  }else{
    return Promise.resolve(Object.keys(state.rateSet))
  }
}

// export const subscribeRealTimeTickers = () => {
//   const socket = new WebSocket(`${BASE_URL_WS}/stream?streams=btcusdt@aggTrade/btcusdc@aggTrade`);
//   socket.addEventListener('message', function (event) {
//       console.log('Message from server ', event.data);
//   });
// }