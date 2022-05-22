
export type Rate = {[symbol: string]:number}
export type RateSet = Array<{time:number, rate: Rate}>
export type Observer = (rateSet:RateSet)=>any