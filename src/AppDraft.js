import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isPainting, setIsPainting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.stokeStyle= "black"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  const startPainting = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsPainting(true)
  }

  const endPainting = () => {
    contextRef.current.closePath()
    setIsPainting(false)
  }

  const paint = ({nativeEvent}) => {
    if(!isPainting){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <canvas 
      onMouseDown={startPainting}
      onMouseUp={endPainting}
      onMouseMove={paint}
      ref={canvasRef}
    />
  );
}

export default App;
