import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
    selectRateSet,
    selectIndexOfTimeframe,
    useObserver,
    updateSelectedIndexOfTimeframe,
} from '../misc/state'
import { RateSet } from '../misc/types'
import DropDownBox from '../components/DropDownBox'

const optionsTimeFrame = { '1min': 1, '5min': 5, '30min': 30, '60min': 60 }

export const AverageComponent = () => {
    const [rateSet, setRateSet] = useState<RateSet>(selectRateSet())
    const [selectedIndex, setSelectedIndex] = useState<number>(
        selectIndexOfTimeframe()
    )
    // extract avgs from rateSet
    const avgs: { [symbol: string]: number } = {}
    let rates: RateSet
    let amountOfRatesNeeded = Object.values(optionsTimeFrame)[selectedIndex]
    if (amountOfRatesNeeded >= rateSet.length) {
        rates = rateSet
    } else {
        rates = rateSet.slice(-amountOfRatesNeeded)
    }
    let temp: { [symbol: string]: Array<number> } = {}
    rates.forEach(({ rate }) => {
        for (const [k, v] of Object.entries(rate)) {
            if (temp[k]) {
                temp[k].push(v)
            } else {
                temp[k] = []
                temp[k].push(v)
            }
        }
    })
    for (const [k, v] of Object.entries(temp)) {
        const sum = v.reduce((a, b) => a + b, 0)
        avgs[k] = sum / v.length
    }
    useObserver((state) => {
        setRateSet(state.rateSet)
        setSelectedIndex(state.selectedIndexOfTimeframe)
    })
    return (
        <div>
            {Object.keys(avgs).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <DropDownBox
                        options={Object.keys(optionsTimeFrame)}
                        indexUpdator={updateSelectedIndexOfTimeframe}
                        currentIndex={selectedIndex}
                    />
                    <TableContainer component={Paper} sx={{ width: 650 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pairs</TableCell>
                                    <TableCell align="right">
                                        Average Price
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(avgs).map((symbol) => (
                                    <TableRow
                                        key={symbol}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                paddingTop: '0px',
                                                paddingBottom: '0px',
                                            }}
                                        >
                                            {symbol}
                                        </TableCell>
                                        <TableCell align="right">
                                            {avgs[symbol].toFixed(4)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    )
}
