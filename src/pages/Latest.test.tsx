import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { LatestComponent } from './Latest'
import { RateSet } from '../misc/types'
import * as S from '../misc/state'

const symbols = ['BTCUSDT', 'BTCPAX']
const ratesForSymbol1 = [25, 54, 32, 33, 54, 36]
const ratesForSymbol2 = [231, 142, 124, 123, 543, 245]
const fakeRateSet: RateSet = [
    {
        time: 10000,
        rate: {
            [symbols[0]]: ratesForSymbol1[0],
            [symbols[1]]: ratesForSymbol2[0],
        },
    },
    {
        time: 20000,
        rate: {
            [symbols[0]]: ratesForSymbol1[1],
            [symbols[1]]: ratesForSymbol2[1],
        },
    },
    {
        time: 30000,
        rate: {
            [symbols[0]]: ratesForSymbol1[2],
            [symbols[1]]: ratesForSymbol2[2],
        },
    },
    {
        time: 40000,
        rate: {
            [symbols[0]]: ratesForSymbol1[3],
            [symbols[1]]: ratesForSymbol2[3],
        },
    },
    {
        time: 50000,
        rate: {
            [symbols[0]]: ratesForSymbol1[4],
            [symbols[1]]: ratesForSymbol2[4],
        },
    },
    {
        time: 60000,
        rate: {
            [symbols[0]]: ratesForSymbol1[5],
            [symbols[1]]: ratesForSymbol2[5],
        },
    },
]

const toChangePercentage: (num1: number, num2: number) => string = (
    num1,
    num2
) => {
    let sign = num2 > num1 ? '+' : num2 === num1 ? '' : '-'
    return sign + (Math.abs(num2 / num1 - 1) * 100).toFixed(5) + '%'
}

const getColorByPercentage: (percentage: string) => string = (percentage) => {
    return percentage.startsWith('+')
        ? 'green'
        : percentage.startsWith('-')
        ? 'red'
        : 'black'
}

test('renders the Latest page', async () => {
    S.resetState()
    render(<LatestComponent />)

    // no data, so 'loading' shows up
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText(symbols[0])).toBeNull()
    expect(screen.queryByText(symbols[1])).toBeNull()

    // loading data
    S.updateRates(fakeRateSet[0].time, fakeRateSet[0].rate)

    // now the data is shown
    await waitFor(() => {
        expect(screen.getByText(symbols[0])).toBeInTheDocument()
    })
    expect(screen.getByText(symbols[1])).toBeInTheDocument()
    expect(screen.getByText(ratesForSymbol1[0])).toBeInTheDocument()
    expect(screen.getByText(ratesForSymbol2[0])).toBeInTheDocument()
    expect(screen.getByText(/%/)).toBeInTheDocument()

    for (let i = 1; i < fakeRateSet.length; i++) {
        // loading the data
        S.updateRates(fakeRateSet[i].time, fakeRateSet[i].rate)
        // now the data is updated
        await waitFor(() => {
            expect(screen.getByText(ratesForSymbol1[i])).toBeInTheDocument()
        })
        expect(screen.getByText(ratesForSymbol2[i])).toBeInTheDocument()
        const percentage1 = screen.getByText(
            toChangePercentage(ratesForSymbol1[i - 1], ratesForSymbol1[i])
        )
        expect(percentage1).toBeInTheDocument()
        const percentage2 = screen.getByText(
            toChangePercentage(ratesForSymbol2[i - 1], ratesForSymbol2[i])
        )
        expect(percentage2).toBeInTheDocument()

        // test the color
        await waitFor(() => {
            expect(
                window.getComputedStyle(percentage1.parentElement).color
            ).toBe(
                getColorByPercentage(
                    toChangePercentage(
                        ratesForSymbol1[i - 1],
                        ratesForSymbol1[i]
                    )
                )
            )
        })
        await waitFor(() => {
            expect(
                window.getComputedStyle(percentage2.parentElement).color
            ).toBe(
                getColorByPercentage(
                    toChangePercentage(
                        ratesForSymbol2[i - 1],
                        ratesForSymbol2[i]
                    )
                )
            )
        })
    }
})
