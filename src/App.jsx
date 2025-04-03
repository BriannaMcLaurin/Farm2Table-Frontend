import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Market from './Market'
import './App.css'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Market />} />
        </Routes>
    </Router>
  )
}

export default App
