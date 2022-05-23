import { useEffect } from 'react'
import { MAX_CACHED_RATES } from '../settings'
import type { IndexUpdater, Observer, Rate, State } from './types'

const state: State = {
    rateSet: [],
    selectedIndexOfSymbols: 0,
    selectedIndexOfTimeframe: 0,
}

export const selectRateSet = () => state.rateSet
export const selectIndexOfSymbols = () => state.selectedIndexOfSymbols
export const selectIndexOfTimeframe = () => state.selectedIndexOfTimeframe
const observers: Array<Observer> = []

export const updateRates: (time: number, rate: Rate) => void = (time, rate) => {
    state.rateSet = [...state.rateSet, { time, rate }]
    if (state.rateSet.length > MAX_CACHED_RATES) {
        state.rateSet = state.rateSet.slice(1)
    }
    for (const observer of observers) {
        observer(state)
    }
}
export const updateSelectedIndexOfSymbols: IndexUpdater = (index) => {
    state.selectedIndexOfSymbols = index
    for (const observer of observers) {
        observer(state)
    }
}
export const updateSelectedIndexOfTimeframe: IndexUpdater = (index) => {
    state.selectedIndexOfTimeframe = index
    for (const observer of observers) {
        observer(state)
    }
}

const subscribeRates: (listener: Observer) => void = (
    listener
) => {
    const isExist = observers.includes(listener)
    if (!isExist) {
        observers.push(listener)
    }
}
const unsubscribeRates: (listener: Observer) => void = (listener) => {
    const index = observers.indexOf(listener)
    if (index !== -1) {
        observers.splice(index, 1)
    }
}

export const useObserver: (listener: Observer) => void = (listener) => {
    // console.log(`length of rateSet outside: ${rateSet.length}`);
    useEffect(() => {
        subscribeRates(listener)
        return () => {
            unsubscribeRates(listener)
        }
    }, [])
}
