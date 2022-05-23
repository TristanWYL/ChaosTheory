import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { AverageComponent } from './Average'

test('renders the logo', () => {
    render(<AverageComponent />)
    // const linkElement = screen.getByText(/chaos theory/i)
    // expect(linkElement).toBeInTheDocument()
})
