import React from 'react'
// import Paint from './components/Paint/paint'
import Home from './pages/index'
import PaintApp from './pages/paint-app';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/paint-app' element={<PaintApp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App


