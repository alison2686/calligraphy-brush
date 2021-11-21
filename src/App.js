import React, { useLayoutEffect, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'


const generator = rough.generator()

function createElement(id, x1, y1, x2, y2, type) {
    // const roughElement = generator.line(x1, y1, x2, y2)
    const roughElement =
     type === 'line'
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2-x1, y2-y1)
    return { id, x1, y1, x2, y2, type, roughElement }
}

const isWithinElement = (x, y, element) => {
    const { type, x1, x2, y1, y2 } = element
    if(type === 'rectangle') {
        const minX = Math.min(x1, x2)
        const maxX = Math.max(x1, x2)
        const minY = Math.min(y1, y2)
        const maxY = Math.max(y1, y2)
        return x >= minX && x <= maxX && y >= minY && y <= maxY
    } else {
        // it's a line
        const a = { x: x1, y: y1 }
        const b = { x: x2, y: y2 }
        const c = { x, y }
        const offset = distance(a, b) - (distance(a, c) + distance(b, c))
        return Math.abs(offset) < 1
    }
}

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
    return elements.find(element => isWithinElement(x, y, element))
}

function App() {
    const [elements, setElements] = useState([])
    const [action, setAction] = useState('none')
    const [tool, setTool] = useState('line')
    const [selectedElement, setSelectedElement] = useState(null)

    useLayoutEffect( () => {
        const canvas = document.getElementById('canvas')
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)

        const roughCanvas = rough.canvas(canvas)

        // const rect = generator.rectangle(10, 10, 100, 100)
        // const line = generator.line(10, 10, 110, 110)
        // roughCanvas.draw(rect)
        // roughCanvas.draw(line)

        elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement))

    }, [elements])

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type)

        const elementsCopy = [...elements]
            
        elementsCopy[id] = updatedElement
        setElements(elementsCopy)
    }

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event
        if(tool === 'selection') {
            // if we are on an element
            const element = getElementAtPosition(clientX, clientY, elements)
            //setAction to moving
            if(element) {
                const offsetX = clientX - element.x1
                const offsetY = clientY - element.y1
                setSelectedElement({...element, offsetX, offsetY})
                setAction('moving')
            }
        } else {
            const id = elements.length
            const element = createElement(id, clientX, clientY, clientX, clientY, tool)
            setElements(prevState => [...prevState, element])

            setAction('painting')
        }
    };

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event

        if(tool === 'selection') {
            event.target.style.cursor = getElementAtPosition(clientX, clientY, elements) ? 'move' : 'default'
        }

        if(action === 'painting'){
            const index = elements.length - 1
            const { x1, y1 } = elements[index]
            updateElement(index, x1, y1, clientX, clientY, tool)
            // console.log(clientX, clientY)
        }else if (action === 'moving') {
            const {id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement
            const width = x2 - x1
            const height = y2 - y1
            const newX1 = clientX - offsetX
            const newY1 = clientY - offsetY
            updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type)
        }
    }
    const handleMouseUp = () => {
        setAction('none')
        setSelectedElement(null)
    }
    
    return (
        <div>
            <div style={{ position: 'fixed'}}>
                <input 
                    type='radio'
                    id='selection'
                    checked={tool === 'selection'}
                    onChange={() => setTool('selection')}
                />
                <lable htmlFor='selection'>Select</lable>
                <input 
                    type='radio'
                    id='line'
                    checked={tool === 'line'}
                    onChange={() => setTool('line')}
                />
                <lable htmlFor='line'>Line</lable>
                <input 
                    type='radio'
                    id='rectangle'
                    checked={tool === 'rectangle'}
                    onChange={() => setTool('rectangle')}
                />
                <label htmlFor='rectangle'>Rectangle</label>
            </div>
            <canvas 
                id='canvas'
                // style={{ backgroundColor: "blue"}}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    )
}

export default App
