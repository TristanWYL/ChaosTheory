import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from './App'

test('renders the logo', () => {
    render(<App />)
    const element = screen.getByText(/chaos theory/i)
    expect(element).toBeInTheDocument()
})

test('redirect to /history', async () => {
    render(<App />)
    await waitFor(() => {
        expect(global.window.location.href).toContain('/history')
    })
})

test('click on links to navigate', async () => {
    render(<App />)
    fireEvent.click(screen.getByText('Average'))
    await waitFor(() => {
        expect(global.window.location.href).toContain('/average')
    })

    fireEvent.click(screen.getByText('History'))
    await waitFor(() => {
        expect(global.window.location.href).toContain('/history')
    })

    fireEvent.click(screen.getByText('Latest'))
    await waitFor(() => {
        expect(global.window.location.href).toContain('/latest')
    })
})
