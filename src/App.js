import React from 'react'
import Home from './pages/index'
import PaintApp from './pages/paint';
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
                <Route path='/paint' element={<PaintApp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App


