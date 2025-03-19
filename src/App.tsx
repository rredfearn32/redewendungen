/**
 * TOOD:
 * - Style in general
 */

import { useEffect, useState } from 'react'
import * as data from './assets/idioms.json'

interface Idiom {
  phrase: string;
  meaning: string;
  explanation: string;
}

enum AnsweredState {
  UNANSWERED,
  CORRECT,
  WRONG
}

const GermanIdioms = data.idioms as unknown as Idiom[];

const getRandomIdiom = (): Idiom => GermanIdioms[Math.floor(Math.random() * GermanIdioms.length)];
const getThreeRandomUniqueIdioms = () => Array.from({length: 3}).reduce((acc: Idiom[]) => {
  let randomIdiom = getRandomIdiom();
  while (acc.includes(randomIdiom)) {
    randomIdiom = getRandomIdiom();
  }
  acc.push(randomIdiom);
  return acc;
}, []);

const calcIsCorrect = (clickedIdiom: Idiom, targetIdiom: Idiom) => clickedIdiom.meaning === targetIdiom.meaning;

const calcIconToShow = (answerState: AnsweredState, clickedIdiom: Idiom, targetIdiom: Idiom) => {
  if(answerState === AnsweredState.UNANSWERED) return;

  if(calcIsCorrect(clickedIdiom, targetIdiom)) {
    return '✅'
  } else {
    return '❌'
  }
}

function App() {
  const [threeRandomIdioms, setThreeRandomIdioms] = useState<Idiom[]>([]);
  const [targetIdiomIndex, setTargetIdiomIndex] = useState<number>(-1);
  const [selectedIdiomIndex, setSelectedIdiomIndex] = useState<number>(-1);
  const [answerState, setAnswerState] = useState<AnsweredState>(AnsweredState.UNANSWERED);
  const [counter, setCounter] = useState(0)

  const targetIdiom = threeRandomIdioms[targetIdiomIndex];
  
  const isReady = targetIdiomIndex !== -1;

  const reset = () => {
    setThreeRandomIdioms(getThreeRandomUniqueIdioms());
    setTargetIdiomIndex(Math.floor(Math.random() * 3));
    setAnswerState(AnsweredState.UNANSWERED);
    setSelectedIdiomIndex(-1)
  };

  const onOptionClick = (option: Idiom, targetIndex: number) => {
    if(answerState !== AnsweredState.UNANSWERED) return;

    setSelectedIdiomIndex(targetIndex)

    if (calcIsCorrect(option, targetIdiom)) {
      setAnswerState(AnsweredState.CORRECT)
      setCounter((current) => current + 1)
    } else {
      setAnswerState(AnsweredState.WRONG);
      setCounter(0)
    }
  }
  
  useEffect(() => {
    setThreeRandomIdioms(getThreeRandomUniqueIdioms());
    setTargetIdiomIndex(Math.floor(Math.random() * 3))
  }, [])

  return (
    <>
      {isReady && 
        <div>
          <p>
            {targetIdiom?.phrase}
          </p>
          {answerState !== AnsweredState.UNANSWERED && <div>{targetIdiom.explanation}</div>}
          <ul>
            {threeRandomIdioms.map((idiom, index) => (
                <li key={idiom.meaning}>
                  <button onClick={() => onOptionClick(idiom, index)} disabled={answerState !== AnsweredState.UNANSWERED} className={`${index === selectedIdiomIndex ? " text-red" : ""}`}>
                    {calcIconToShow(answerState, idiom, targetIdiom)}{idiom.meaning}
                  </button>
                </li>
            ))}
          </ul>
          <div>Correct: {counter}</div>
          {answerState !== AnsweredState.UNANSWERED && <>
          {answerState === AnsweredState.CORRECT ? (
            <div>
              <p>Correct</p>
            </div>
          ) : <div>Wrong</div>}<button onClick={reset}>Next</button></>}
        </div>
      }
    </>
  )
}

export default App
