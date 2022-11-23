import React, { useState } from "react";
import "./App.css";

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
    console.log(e);
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  }

  function handleUndo() {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  }

  function handleRedo() {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPopped(newPopped);
  }

  return (
    <>
      <div className="button-menu">
        <h2>Shiba Clicker</h2>
        <button disabled={points.length == 0} onClick={handleUndo}>
          Undo Shiba
        </button>
        <button disabled={popped.length == 0} onClick={handleRedo}>
          Redo Shiba
        </button>
      </div>

      <div className="App" onClick={handlePlaceCircle}>
        <h1>Click Me!</h1>
        {points.map((point, idx) => (
          <div
            key={idx}
            className="point"
            style={{
              left: point.x + "px",
              top: point.y + "px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
