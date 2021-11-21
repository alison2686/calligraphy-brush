import React from 'react'
// import Paint from './components/Paint/paint'
import Home from './pages/index'
import OpenApp from './pages/openApp';
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
                <Route path='/openApp' element={<OpenApp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App


