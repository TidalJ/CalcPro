/* eslint-disable no-eval */
import "./app.css";
import { useState } from "react";
let numList = ['0']
function App() {

  const [display, setDisplay] = useState('0');

  const showNum = (e) => {
    const num = e.target.textContent;

    const list = ['*', '/', '-', '+', '.'];
    if (num === '0') {
      if (numList.length === 1 && numList[0] !== '0') {
        numList[0] = numList[0] === '0' ? num : numList[0] + num
        setDisplay(numList.join(''));
      } else {
        if (list.includes(numList[numList.length - 1])) {
          numList = [...numList, num]
          // console.log(numList, 1);
          setDisplay(numList.join(''));
        } else if (numList[numList.length - 1] !== '0') {
          numList[numList.length - 1] = numList[numList.length - 1] === '0' ? num : numList[numList.length - 1] + num
          setDisplay(numList.join(''));
        }
      }
    } else {
      if (list.includes(numList[numList.length - 1])) {
        numList = [...numList, num]
        setDisplay(numList.join(''));
      } else {
        numList[numList.length - 1] = numList[numList.length - 1] === '0' ? num : numList[numList.length - 1] + num
        setDisplay(numList.join(''));
      }
    }
    console.log(numList);
  }


  const showOp = (type) => {
    const list = ['*', '/', '-', '+', '.'];
    const lastStr = display[display.length - 1];
    if (type === '.' && !list.includes(lastStr)) {
      console.log(numList)
      if ((numList.length >= 3 && numList[numList.length - 2] !== '.')) {
        numList.push(type)
        setDisplay(numList.join(''));
      } else if (numList.length <= 2) {
        numList.push(type)
        setDisplay(numList.join(''));
      }

    } else if (type !== '.' && !list.includes(lastStr)) {
      numList = [...numList, type]
      setDisplay(numList.join(''));
    }
  }


  const showEq = () => {
    if (display === '0') {
      setDisplay('0');
      numList = ['0']
    } else {

      const list = ['*', '/', '-', '+', '.'];
      const lastStr = display[display.length - 1];

      if (list.includes(lastStr)) {
        alert("Error");
        setDisplay('0');
        numList = ['0']
      } else {
        const result = eval(display);
        setDisplay(result.toString());
        numList = []
        const temp = String(result).split('')
        console.log(temp);
        let j = 0
        for (let i = 0; i < temp.length; i++) {
          if (i === temp.length - 1) {
            if (j === 0) {
              numList.push(temp.slice(j, i + 1).join(''))
            } else {
              numList.push(temp.slice(j + 1, i + 1).join(''))
            }
          }
          if (list.includes(temp[i])) {
            console.log(temp.slice(j, i).join(''))
            numList.push(temp.slice(j, i).join(''))
            numList.push(temp[i])
            j = i
          }
        }
        console.log(numList);
        const abc = String(result);
        const x = abc.split('.');
        console.log(x);

      }
    }
  }

  const showCl = () => {
    setDisplay('0');
    numList = ['0']
  }

  return (
    <div className="calculator">
      <div className="result input">
        <div className="pre-num">{display}</div>
      </div>

      <button onClick={showCl} className="ac button">AC</button>
      <button onClick={() => showOp('/')} className="button">/</button>
      <button onClick={showNum} className="button">7</button>
      <button onClick={showNum} className="button">8</button>
      <button onClick={showNum} className="button">9</button>
      <button onClick={() => showOp('*')} className="button">*</button>
      <button onClick={showNum} className="button">4</button>
      <button onClick={showNum} className="button">5</button>
      <button onClick={showNum} className="button">6</button>
      <button onClick={() => showOp('-')} className="button">-</button>
      <button onClick={showNum} className="button">1</button>
      <button onClick={showNum} className="button">2</button>
      <button onClick={showNum} className="button">3</button>
      <button onClick={() => showOp('+')} className="button">+</button>
      <button onClick={showNum} className="zero button">0</button>
      <button onClick={() => showOp('.')} className="button">.</button>
      <button onClick={showEq} className="button">=</button>
    </div>
  );
}

export default App;