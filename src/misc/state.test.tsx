import { randomInt } from 'crypto'
import * as S from './state'
import { RateSet } from './types'
import { render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'

test('selectors and updaters', () => {
    S.resetState()
    let time = randomInt(1, 30)
    let price = 30000
    let pair = 'BTCUSDT'
    const rateSet1: RateSet = [{ time, rate: { [pair]: price } }]
    act(() => {
        S.updateRates(time, { [pair]: price })
    })
    expect(S.selectRateSet().length).toBe(1)
    expect(S.selectRateSet()).toStrictEqual(rateSet1)

    time = randomInt(1, 30)
    price = 20000
    const rateSet2: RateSet = [{ time, rate: { [pair]: price } }]
    act(() => {
        S.updateRates(time, { [pair]: price })
    })
    expect(S.selectRateSet().length).toBe(2)
    expect(S.selectRateSet()).toStrictEqual(rateSet1.concat(rateSet2))

    let symbolIndex = randomInt(1, 30)
    act(() => {
        S.updateSelectedIndexOfSymbols(symbolIndex)
    })
    expect(S.selectIndexOfSymbols()).toBe(symbolIndex)

    let timeFrameIndex = randomInt(1, 30)
    act(() => {
        S.updateSelectedIndexOfTimeframe(timeFrameIndex)
    })
    expect(S.selectIndexOfTimeframe()).toBe(timeFrameIndex)
})

const TestComponent = () => {
    const [state, setState] = useState(S.selectState())
    S.useObserver((s) => setState(s))
    return (
        <div>
            <p>{'selectedIndexOfSymbols: ' + state.selectedIndexOfSymbols}</p>
            <p>
                {'selectedIndexOfTimeframe: ' + state.selectedIndexOfTimeframe}
            </p>
            <div>
                {state.rateSet.map(({ time, rate }) => (
                    <div key={time}>
                        <p>time: {time}</p>
                        <div>
                            {Object.entries(rate).map(([symbol, price]) => (
                                <p key={symbol}>{`${symbol}: ${price}`}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

test('observer', async () => {
    S.resetState()
    render(<TestComponent />)
    const element1 = screen.getByText('selectedIndexOfSymbols: 0')
    const element2 = screen.getByText('selectedIndexOfTimeframe: 0')
    expect(element1).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
    const element3 = screen.queryByText('time: ')
    expect(element3).toBeNull()
    let symbolIndex = randomInt(1, 30)

    act(() => {
        S.updateSelectedIndexOfSymbols(symbolIndex)
    })
    await waitFor(() => {
        expect(
            screen.getByText('selectedIndexOfSymbols: ' + symbolIndex)
        ).toBeInTheDocument()
    })

    let timeFrameIndex = randomInt(1, 30)
    act(() => {
        S.updateSelectedIndexOfTimeframe(timeFrameIndex)
    })
    await waitFor(() => {
        expect(
            screen.getByText('selectedIndexOfTimeframe: ' + timeFrameIndex)
        ).toBeInTheDocument()
    })

    let time = randomInt(1, 30)
    let price = 30000
    let pair = 'BTCUSDT'
    act(() => {
        S.updateRates(time, { [pair]: price })
    })
    await waitFor(() => {
        expect(screen.getByText('time: ' + time)).toBeInTheDocument()
    })
    await waitFor(() => {
        expect(screen.getByText(pair + ': ' + price)).toBeInTheDocument()
    })

    time = randomInt(1, 30)
    price = 20000
    pair = 'BTCUSDC'
    act(() => {
        S.updateRates(time, { [pair]: price })
    })
    await waitFor(() => {
        expect(screen.getAllByText(/time:/)).toHaveLength(2)
    })
    await waitFor(() => {
        expect(screen.getByText(pair + ': ' + price)).toBeInTheDocument()
    })
})
