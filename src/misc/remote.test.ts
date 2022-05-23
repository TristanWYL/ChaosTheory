import {getBTCExchangeRates} from './remote'

it('fetch data', async () => {
  const rates = await getBTCExchangeRates()
  for( const k of Object.keys(rates)){
    k.startsWith('BTC')
    expect(k.startsWith('BTC')).toBeTruthy()
  }
});