import { MAX_CACHED_RATES } from '../settings'
import type {Observer, Rate, RateSet} from './types'


type State = {
  rateSet: RateSet
}
export const state:State = {
  rateSet: []
}

const observers: Array<Observer> = []

export const updateRates: (time: number, rate: Rate) => void = (time, rate) => {
  state.rateSet = [...state.rateSet, {time, rate}]
  if(state.rateSet.length > MAX_CACHED_RATES){
    state.rateSet = state.rateSet.slice(1)
  }
  for(const observer of observers){
    observer(state.rateSet)
  }
}

export const subscribeRates:(listener:(rateSet:RateSet)=>any, immediate?:boolean)=>void = (listener, immediate=true) => {
  const isExist = observers.includes(listener)
  if(!isExist){
    observers.push(listener)
  }
  if(immediate){
    listener(state.rateSet)
  }
}
export const unsubscribeRates:(listener:(rateSet:RateSet)=>any)=>void = (listener) => {
  const index = observers.indexOf(listener)
  if(index !== -1){
    observers.splice(index, 1)
  }
}

