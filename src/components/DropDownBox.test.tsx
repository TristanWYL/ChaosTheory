import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import DropDownBox from './DropDownBox'

test('interact with the DropDownBox', async () => {
    let options = ['A', 'B', 'C']
    const indexUpdator = jest.fn((x) => x)
    render(<DropDownBox options={options} indexUpdator={indexUpdator} />)

    // default option
    const button1 = screen.getByText(options[0])
    expect(button1).toBeInTheDocument()

    // the Popper is closed
    expect(screen.queryByText(options[1])).toBeNull()
    expect(screen.queryByText(options[2])).toBeNull()

    // click the button to pop the options
    let buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    let index = buttons.indexOf(button1)
    expect(index).toBeGreaterThanOrEqual(0)
    buttons.splice(index, 1)
    fireEvent.click(buttons[0])
    await waitFor(() => {
        // the Popper is open
        expect(screen.queryAllByText(options[0])).toHaveLength(2)
    })
    expect(screen.getByText(options[1])).toBeInTheDocument()
    expect(screen.getByText(options[2])).toBeInTheDocument()

    // click on the third one
    fireEvent.click(screen.getByText(options[2]))
    // The mock function is called once
    expect(indexUpdator.mock.calls.length).toBe(1)
    // The first argument of the first call to the function was 2
    expect(indexUpdator.mock.calls[0][0]).toBe(2)
    // The return value of the first call to the function was 42
    expect(indexUpdator.mock.results[0].value).toBe(2)

    // all disappear but the third one
    await waitFor(() => {
        expect(screen.getByText(options[2])).toBeInTheDocument()
    })
    expect(screen.queryByText(options[0])).toBeNull()
    expect(screen.queryByText(options[1])).toBeNull()
})
