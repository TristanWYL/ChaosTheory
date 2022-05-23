import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { AverageComponent } from './Average'
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

test('renders the average page', async () => {
    S.resetState()
    render(<AverageComponent />)

    // no data, so 'loading' shows up
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText(symbols[0])).toBeNull()
    expect(screen.queryByText(symbols[1])).toBeNull()

    act(() => {
        // loading data
        S.updateRates(fakeRateSet[0].time, fakeRateSet[0].rate)
    })

    // now the data is shown
    await waitFor(() => {
        expect(screen.getByText(symbols[0])).toBeInTheDocument()
    })
    expect(screen.getByText(symbols[1])).toBeInTheDocument()
    expect(screen.getByText(ratesForSymbol1[0].toFixed(4))).toBeInTheDocument()
    expect(screen.getByText(ratesForSymbol2[0].toFixed(4))).toBeInTheDocument()

    // by default the period of the average is '1MIN'
    expect(screen.getByText('1min')).toBeInTheDocument()

    for (let i = 1; i < fakeRateSet.length; i++) {
        act(() => {
            // loading the data
            S.updateRates(fakeRateSet[i].time, fakeRateSet[i].rate)
        })
        // now the data is updated
        await waitFor(() => {
            expect(screen.getByText(symbols[0])).toBeInTheDocument()
        })
        expect(screen.getByText(symbols[1])).toBeInTheDocument()
        await waitFor(() => {
            expect(
                screen.getByText(ratesForSymbol1[i].toFixed(4))
            ).toBeInTheDocument()
        })
        expect(
            screen.getByText(ratesForSymbol2[i].toFixed(4))
        ).toBeInTheDocument()
    }

    // now adjust the period for averaging
    // locate the DropDownBox's button
    let button = screen.getAllByRole('button')[1]
    fireEvent.click(button)
    await waitFor(() => {
        // the Popper should have been open here
        expect(screen.getByText('5min')).toBeInTheDocument()
    })

    // now use '5min'
    fireEvent.click(screen.getByText('5min'))
    await waitFor(() => {
        // now the last five data have been averaged and UI is updated
        let data0 =
            ratesForSymbol1.slice(1).reduce((pre, curr) => pre + curr, 0) / 5
        expect(screen.getByText(data0.toFixed(4))).toBeInTheDocument()
    })
    let data1 =
        ratesForSymbol2.slice(1).reduce((pre, curr) => pre + curr, 0) / 5
    expect(screen.getByText(data1.toFixed(4))).toBeInTheDocument()
})
