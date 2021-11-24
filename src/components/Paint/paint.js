import React, { useLayoutEffect, useState } from 'react'
// import { useEffect } from 'react/cjs/react.development'
import rough from 'roughjs/bundled/rough.esm'
// import ColorPicker from '../ColorPicker/ColorPicker'
import getStroke from 'perfect-freehand'
import { 
  PaintBtnWrapper, 
  PaintContainer,
  PaintTools,
  UndoRedoBtn
} from './PaintElements'


const generator = rough.generator()

function createElement(id, x1, y1, x2, y2, type) {
    switch (type) {
        case 'line':
        case 'rectangle':
          const roughElement =
            type === 'line'
              ? generator.line(x1, y1, x2, y2)
              : generator.rectangle(x1, y1, x2 - x1, y2 - y1)
          return { id, x1, y1, x2, y2, type, roughElement }
        case 'pencil':
          return { id, type, points: [{ x: x1, y: y1 }] }
        case 'text':
          return { id, type, x1, y1, x2, y2, text: '' }
        default:
          throw new Error(`Type not recognised: ${type}`)
      }
}

const nearPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null
}

const onLine = (x1, y1, x2, y2, x, y, elementDistance = 1) => {
    const a = { x: x1, y: y1 }
    const b = { x: x2, y: y2 }
    const c = { x, y }
    const offset = distance(a, b) - (distance(a, c) + distance(b, c))
    return Math.abs(offset) < elementDistance ? 'inside' : null
  }

const positionWithinElement = (x, y, element) => {
    const { type, x1, x2, y1, y2 } = element
    switch (type) {
      case 'line':
        const on = onLine(x1, y1, x2, y2, x, y)
        const start = nearPoint(x, y, x1, y1, 'start')
        const end = nearPoint(x, y, x2, y2, 'end')
        return start || end || on
      case 'rectangle':
        const topLeft = nearPoint(x, y, x1, y1, 'tl')
        const topRight = nearPoint(x, y, x2, y1, 'tr')
        const bottomLeft = nearPoint(x, y, x1, y2, 'bl')
        const bottomRight = nearPoint(x, y, x2, y2, 'br')
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null
        return topLeft || topRight || bottomLeft || bottomRight || inside
      case 'pencil':
        const betweenAnyPoint = element.points.some((point, index) => {
          const nextPoint = element.points[index + 1]
          if (!nextPoint) return false
          return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
        })
        return betweenAnyPoint ? 'inside' : null
      case 'text':
        return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null
      default:
        throw new Error(`Type not recognised: ${type}`)
    }
  }

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

const getElementAtPosition = (x, y, elements) => {
    return elements
        .map(element => ({ ...element, position: positionWithinElement(x, y, element) }))
        .find(element => element.position !== null)
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
        case 'tl':
        case 'br':
        case 'start':
        case 'end':
          return 'nwse-resize'
        case 'tr':
        case 'bl':
          return 'nesw-resize'
        default:
          return 'move'
      }
}

const resizedCoords = (clientX, clientY, position, coords) => {
    const { x1, y1, x2, y2 } = coords
  switch (position) {
    case 'tl':
    case 'start':
      return { x1: clientX, y1: clientY, x2, y2 }
    case 'tr':
      return { x1, y1: clientY, x2: clientX, y2 }
    case 'bl':
      return { x1: clientX, y1, x2, y2: clientY }
    case 'br':
    case 'end':
      return { x1, y1, x2: clientX, y2: clientY }
    default:
      return null 
  }
}


const useHistory = (initialState) => {
    const [index, setIndex] = useState(0)
    const [history, setHistory] = useState([initialState])

    const setState = (action, overwrite = false) => {
        const newState = typeof action === 'function' ? action(history[index]) : action
        if (overwrite) {
            const historyCopy = [...history]
            historyCopy[index] = newState
            setHistory(historyCopy)
          } else {
            const updatedState = [...history].slice(0, index + 1)
            setHistory([...updatedState, newState])
            setIndex(prevState => prevState + 1)
          }
    }

    const undo = () => index > 0 && setIndex(prevState => prevState - 1)
    const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1)

    return [history[index], setState, undo, redo]
}

const getSvgPathFromStroke = stroke => {
    if (!stroke.length) return ''
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length]
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
        return acc
      },
      ['M', ...stroke[0], 'Q']
    )
  
    d.push('Z')
    return d.join(' ')
  }

const drawElement = (roughCanvas, context, element) => {
    switch (element.type) {
        case 'line':
        case 'rectangle':
          roughCanvas.draw(element.roughElement)
          break
        case 'pencil':
          const stroke = getSvgPathFromStroke(getStroke(element.points, {
              size: 30,
              thinning: 0.5,
              smoothing: 0.5,
              streamline: 0.5,
              easing: (t) => t,
              start: {
                taper: 0,
                easing: (t) => t,
                cap: true
              },
              end: {
                taper: 100,
                easing: (t) => t,
                cap: true
              }

          }))
          context.fill(new Path2D(stroke))
          break
        default:
          throw new Error(`Type not recognised: ${element.type}`)
      }
}

const adjustmentRequired = (type) => {

}

function Paint() {
    const [elements, setElements, undo, redo] = useHistory([])
    const [action, setAction] = useState('none')
    const [tool, setTool] = useState('pencil')
    const [selectedElement, setSelectedElement] = useState(null)

    useLayoutEffect( () => {
        const canvas = document.getElementById('canvas')
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)

        const roughCanvas = rough.canvas(canvas)

        elements.forEach(element => drawElement(roughCanvas, context, element))

    }, [elements])

    // useEffect(() => {
    //     const undoRedoFunction = event => {
    //       if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
    //         if (event.shiftKey) {
    //           redo()
    //         } else {
    //           undo()
    //         }
    //       }
    //     }
    
    //     document.addEventListener('keydown', undoRedoFunction)
    //     return () => {
    //       document.removeEventListener('keydown', undoRedoFunction)
    //     }
    //   }, [undo, redo])

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements]

    switch (type) {
      case 'line':
      case 'rectangle':
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type)
        break
      case 'pencil':
        elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }]
        break
      case 'text':
        const textWidth = document
          .getElementById('canvas')
          .getContext('2d')
          .measureText(options.text).width
        const textHeight = 24
        elementsCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        }
        break
      default:
        throw new Error(`Type not recognised: ${type}`)
    }

    setElements(elementsCopy, true)
  }

  const handleMouseDown = event => {
    if (action === 'writing') return

    const { clientX, clientY } = event
    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements)
      if (element) {
        if (element.type === 'pencil') {
          const xOffsets = element.points.map(point => clientX - point.x)
          const yOffsets = element.points.map(point => clientY - point.y)
          setSelectedElement({ ...element, xOffsets, yOffsets })
        } else {
          const offsetX = clientX - element.x1
          const offsetY = clientY - element.y1
          setSelectedElement({ ...element, offsetX, offsetY })
        }
        setElements(prevState => prevState)

        if (element.position === 'inside') {
          setAction('moving')
        } else {
          setAction('resizing')
        }
      }
    } else {
      const id = elements.length
      const element = createElement(id, clientX, clientY, clientX, clientY, tool)
      setElements(prevState => [...prevState, element])
      setSelectedElement(element)

      setAction(tool === 'text' ? 'writing' : 'painting')
    }
  }

  const handleMouseMove = event => {
    const { clientX, clientY } = event

    if (tool === 'selection') {
      const element = getElementAtPosition(clientX, clientY, elements)
      event.target.style.cursor = element ? cursorForPosition(element.position) : 'default'
    }

    if (action === 'painting') {
      const index = elements.length - 1
      const { x1, y1 } = elements[index]
      updateElement(index, x1, y1, clientX, clientY, tool)
    } else if (action === 'moving') {
      if (selectedElement.type === 'pencil') {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }))
        const elementsCopy = [...elements]
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        }
        setElements(elementsCopy, true)
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement
        const width = x2 - x1
        const height = y2 - y1
        const newX1 = clientX - offsetX
        const newY1 = clientY - offsetY
        const options = type === 'text' ? { text: selectedElement.text } : {}
        updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, options)
      }
    } else if (action === 'resizing') {
      const { id, type, position, ...coordinates } = selectedElement
      const { x1, y1, x2, y2 } = resizedCoords(clientX, clientY, position, coordinates)
      updateElement(id, x1, y1, x2, y2, type)
    }
  }

    const handleMouseUp = () => {
        if(selectedElement) {
        const index = selectedElement.id
        const { id, type } = elements[index]
        if((action === 'painting' || action === 'resizing') && adjustmentRequired(type)) {
            const {x1, y1, x2, y2} = adjustElementCoords(elements[index])
            updateElement(id, x1, y1, x2, y2, type)          
            }
        }
        setAction('none')
        setSelectedElement(null)
    }
    
    return (
        <PaintContainer id='paint-container'>
            <PaintTools>
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
                <input 
                    type='radio'
                    id='pencil'
                    checked={tool === 'pencil'}
                    onChange={() => setTool('pencil')}
                />
                <label htmlFor='pencil'>Calligraphy</label>
              </PaintTools>
              <PaintBtnWrapper>
                  <UndoRedoBtn
                  onClick={undo}
                  smooth={true} 
                  duration={500} 
                  spy={true} 
                  exact='true' 
                  // offset={-80}
                  >
                    Undo
                  </UndoRedoBtn>
                  <br />
                  <UndoRedoBtn 
                    onClick={redo}
                    smooth={true} 
                    duration={500} 
                    spy={true} 
                    // exact='true' 
                    // offset={-80}
                  >
                    Redo
                  </UndoRedoBtn>
              </PaintBtnWrapper>
            {/* <div className='color-picker' style={{ position: 'fixed', top: 0, padding: 50}}>
                <ColorPicker />
            </div> */}
            <canvas 
                id='canvas'
                // style={{ backgroundColor: 'blue'}}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </PaintContainer>
    )
}

export default Paint