import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Body from './components/Routes'
import Header from './components/Appbar'

function App() {
    return (
        <Router>
            <Header />
            <Body />
        </Router>
    )
}

export default App
