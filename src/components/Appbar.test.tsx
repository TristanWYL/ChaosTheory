import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import Appbar from './Appbar'
test('renders the logo', () => {
    render(
        <Router>
            <Appbar />
            <Routes />
        </Router>
    )
    const element = screen.getByText(/chaos theory/i)
    expect(element).toBeInTheDocument()
})

test('renders the three links', async () => {
    render(
        <Router>
            <Appbar />
            <Routes />
        </Router>
    )
    let element = screen.getByText(/history/i)
    expect(element).toBeInTheDocument()
    element = screen.getByText(/average/i)
    expect(element).toBeInTheDocument()
    element = screen.getByText(/latest/i)
    expect(element).toBeInTheDocument()
})
