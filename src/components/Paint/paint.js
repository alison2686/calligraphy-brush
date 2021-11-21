import React, { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
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

const nearPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null
}

const positionWithinElement = (x, y, element) => {
    const { type, x1, x2, y1, y2 } = element
    if(type === 'rectangle') {
        const topLeft = nearPoint(x, y, x1, y1, "tl");
        const topRight = nearPoint(x, y, x2, y1, "tr");
        const bottomLeft = nearPoint(x, y, x1, y2, "bl");
        const bottomRight = nearPoint(x, y, x2, y2, "br");
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        return topLeft || topRight || bottomLeft || bottomRight || inside;
    } else {
        // it's a line
        const a = { x: x1, y: y1 }
        const b = { x: x2, y: y2 }
        const c = { x, y }
        const offset = distance(a, b) - (distance(a, c) + distance(b, c))
        const start = nearPoint(x, y, x1, y1, 'start')
        const end = nearPoint(x, y, x2, y2, 'end')
        const inside = Math.abs(offset) < 1 ? 'inside' : null

        return start || end || inside
    }
}

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
    return elements
        .map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
        .find(element => element.position !== null);
}

const adjustElementCoords = element => {
    const {type, x1, y1, x2, y2} = element
    if(type === 'rectangle') {
        const minX = Math.min(x1, x2)
        const maxX = Math.max(x1, x2)
        const minY = Math.min(y1, y2)
        const maxY = Math.max(y1, y2)
        return {x1: minX, y1: minY, x2: maxX, y2: maxY}
    }else {
        if(x1 < x2 || (x1 === x2 && y1 < y2)) {
            return {x1, y1, x2, y2}
        }else {
            return {x1: x2, y1: y2, x2: x1, y2: y1}
        }
    }
}

const cursorForPosition = position => {
    switch (position) {
        case "tl":
        case "br":
        case "start":
        case "end":
          return "nwse-resize";
        case "tr":
        case "bl":
          return "nesw-resize";
        default:
          return "move";
      }
}

const resizedCoords = (clientX, clientY, position, coords) => {
    const { x1, y1, x2, y2 } = coords;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; //should not really get here...
  }
}

const useHistory = (initialState) => {
    const [index, setIndex] = useState(0)
    const [history, setHistory] = useState([initialState])

    const setState = (action, overwrite = false) => {
        const newState = typeof action === 'function' ? action(history[index]) : action
        if (overwrite) {
            const historyCopy = [...history];
            historyCopy[index] = newState;
            setHistory(historyCopy);
          } else {
            const updatedState = [...history].slice(0, index + 1);
            setHistory([...updatedState, newState]);
            setIndex(prevState => prevState + 1);
          }
    }

    const undo = () => index > 0 && setIndex(prevState => prevState - 1);
    const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

    return [history[index], setState, undo, redo]
}

function Paint() {
    const [elements, setElements, undo, redo] = useHistory([])
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

    useEffect(() => {
        const undoRedoFunction = event => {
          if ((event.metaKey || event.ctrlKey) && event.key === "z") {
            if (event.shiftKey) {
              redo()
            } else {
              undo()
            }
          }
        };
    
        document.addEventListener('keydown', undoRedoFunction);
        return () => {
          document.removeEventListener('keydown', undoRedoFunction);
        };
      }, [undo, redo]);

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type)

        const elementsCopy = [...elements]
            
        elementsCopy[id] = updatedElement
        setElements(elementsCopy, true)
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
                setElements(prevState => prevState)

                if (element.position === "inside") {
                    setAction("moving");
                  } else {
                    setAction("resizing");
                  }
            }
        } else {
            const id = elements.length
            const element = createElement(id, clientX, clientY, clientX, clientY, tool)
            setElements(prevState => [...prevState, element])
            setSelectedElement(element)

            setAction('painting')
        }
    };

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event

        if(tool === 'selection') {
            const element = getElementAtPosition(clientX, clientY, elements)
            event.target.style.cursor = element
             ? cursorForPosition(element.position) 
             : 'default'
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
        } else if (action === 'resizing') {
            const {id, type, position, ...coords } = selectedElement
            const {x1, y1, x2, y2} = resizedCoords(clientX, clientY, position, coords)
            updateElement(id, x1, y1, x2, y2, type)  
        }
    }
    const handleMouseUp = () => {
        if(selectedElement) {
        const index = selectedElement.id
        const { id, type } = elements[index]
        if(action === 'painting' || action === 'resizing') {
            const {x1, y1, x2, y2} = adjustElementCoords(elements[index])
            updateElement(id, x1, y1, x2, y2, type)          
            }
        }
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
            <div style={{ position: 'fixed', bottom: 0, padding: 18}}>
                <button onClick={undo}>Undo</button>
                <button onClick={redo}>Redo</button>
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

export default Paint