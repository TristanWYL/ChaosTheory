import { useEffect } from 'react'
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

const subscribeRates:(listener:Observer, immediate?:boolean)=>void = (listener, immediate=true) => {
  const isExist = observers.includes(listener)
  if(!isExist){
    observers.push(listener)
  }
  if(immediate){
    listener(state.rateSet)
  }
}
const unsubscribeRates:(listener:Observer)=>void = (listener) => {
  const index = observers.indexOf(listener)
  if(index !== -1){
    observers.splice(index, 1)
  }
}

export const useRatesObserver: (listener: Observer) => void = (listener) =>{
  // console.log(`length of rateSet outside: ${rateSet.length}`);
  useEffect(() => {
    subscribeRates(listener);
    return () => {
      unsubscribeRates(listener)
    };
  }, []);
}