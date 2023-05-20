import { useState, useEffect } from "react";
import "normalize.css";
import "./App.css";

function App() {
  const [time, setTime] = useState(5);
  const [randomTime, setRandomTime] = useState(2);
  const [active, setActive] = useState(false);
  const [ms, setMs] = useState(0);
  const [result, setResult] = useState(0);

  const handleTarget = () => {
    if (randomTime !== 0) return;
    const d = new Date();

    setResult(d.getTime() - ms);

    setActive(false);
    setRandomTime(2);
    setTime(5);
  };

  useEffect(() => {
    if (active) {
      const timer = setInterval(() => {
        if (time === 0) {
          return clearInterval(timer);
        }

        setTime((time) => time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, active]);

  useEffect(() => {
    if (time === 0) {
      setTimeout(() => {
        setRandomTime(0);
        const d = new Date();
        setMs(d.getTime());
      }, randomTime * 1000);
    }
  }, [time, randomTime]);

  return (
    <>
      <div className="wrapper">
        <h2 className="title">Check your reaction time</h2>
        <p className="subtitle">Нажми на квадрат когда он станет зеленым</p>
        <div className="zone">
          {result ? <div className="result">Ваш результат: {result} ms</div> : null}
          <div
            onClick={handleTarget}
            className={`target ${randomTime === 0 ? "green" : null}`}
          >
            {time === 0 ? "Жди зеленый" : time}
          </div>
          <div className="btn" onClick={() => setActive(true)}>
            Start test
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
