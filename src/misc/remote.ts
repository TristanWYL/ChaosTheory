import Binance from 'binance-api-node'

const client = Binance()
client.time().then(time => console.log(time))


export const getBTCExchangeRates: ()=>Promise<{[k: string]:number}> = async () => {
  const rates = (await client.prices()) as unknown as {[k: string]:number}
  for(const prop in rates){
    if(!prop.startsWith('BTC')){
      delete rates[prop]
    }
  }
  return rates
}

export const getHistoryBySymbol: (symbol:string)=>Promise<Array<number>> = async (symbol) => {
  return [1]
}

export const getAvgPrices: ()=>Promise<{[k: string]:number}> = async () => {
  return {"1":1}
}

export const subscribeLatestPrices: () => void = ()=>{}