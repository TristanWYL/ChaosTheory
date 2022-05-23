// This is the page showing history of a currency pair
import { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { RateSet } from '../misc/types'
import {
    selectRateSet,
    selectIndexOfSymbols,
    updateSelectedIndexOfSymbols,
    useObserver,
} from '../misc/state'
import DropDownBox from '../components/DropDownBox'

const formatXAxis: (tick_ms: number) => string = (tick_ms) => {
    let d = new Date(0) // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(tick_ms / 1000)
    let s = d.toLocaleString('zh-CN', { hour12: false })
    return s
}

export const HistoryComponent = () => {
    const [rateSet, setRateSet] = useState<RateSet>(selectRateSet())
    const [selectedIndex, setSelectedIndex] = useState<number>(
        selectIndexOfSymbols()
    )
    const symbols: Array<string> = rateSet[0] && Object.keys(rateSet[0].rate)
    const historyData: Array<{ openTime: number; openPrice: number }> = []
    rateSet.forEach(({ time, rate }) => {
        historyData.push({
            openTime: time,
            openPrice: rate[symbols[selectedIndex]],
        })
    })
    useObserver((state) => {
        setRateSet(state.rateSet)
        setSelectedIndex(state.selectedIndexOfSymbols)
    })

    return (
        <div>
            {rateSet.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div style={{ zIndex: -1 }}>
                        <DropDownBox
                            options={symbols}
                            indexUpdator={updateSelectedIndexOfSymbols}
                            currentIndex={selectedIndex}
                        />
                    </div>
                    <div style={{ zIndex: -100, position: 'relative' }}>
                        <LineChart
                            width={600}
                            height={400}
                            data={historyData}
                            margin={{
                                top: 45,
                                right: 45,
                                bottom: 45,
                                left: 45,
                            }}
                        >
                            <Line
                                type="monotone"
                                dataKey="openPrice"
                                stroke="#8884d8"
                            />
                            <CartesianGrid
                                stroke="#ccc"
                                strokeDasharray="5 5"
                            />
                            <XAxis
                                dataKey="openTime"
                                scale={'time'}
                                type="number"
                                tickFormatter={formatXAxis}
                                domain={['dataMin', 'dataMax']}
                            />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                </div>
            )}
        </div>
    )
}
