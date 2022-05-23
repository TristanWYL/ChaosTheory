

export type Rate = {[symbol: string]:number}
export type RateSet = Array<{time:number, rate: Rate}>
export type State = {
  rateSet: RateSet,
  selectedIndexOfSymbols: number,
  selectedIndexOfTimeframe: number
}
export type Observer = (state:State)=>any
export type IndexUpdater = (index: number) => void