import {useEffect, useState} from 'react'
import * as data from './assets/idioms.json'
import {Answer} from "./components/Answer.tsx";
import Idiom from "./types/Idiom.ts";
import AnsweredState from "./types/AnsweredState.ts";
import {Result} from "./components/Result.tsx";

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

function App() {
  const [threeRandomIdioms, setThreeRandomIdioms] = useState<Idiom[]>([]);
  const [targetIdiomIndex, setTargetIdiomIndex] = useState<number>(-1);
  const [selectedIdiomIndex, setSelectedIdiomIndex] = useState<number>(-1);
  const [answeredState, setAnsweredState] = useState<AnsweredState>(AnsweredState.UNANSWERED);
  const [counter, setCounter] = useState(0)

  const targetIdiom = threeRandomIdioms[targetIdiomIndex];
  
  const isReady = targetIdiomIndex !== -1;

  const reset = () => {
    setThreeRandomIdioms(getThreeRandomUniqueIdioms());
    setTargetIdiomIndex(Math.floor(Math.random() * 3));
    setAnsweredState(AnsweredState.UNANSWERED);
    setSelectedIdiomIndex(-1)
  };

  const onOptionClick = (option: Idiom, targetIndex: number) => {
    if(answeredState !== AnsweredState.UNANSWERED) return;

    setSelectedIdiomIndex(targetIndex)

    if (calcIsCorrect(option, targetIdiom)) {
      setAnsweredState(AnsweredState.CORRECT)
      setCounter((current) => current + 1)
    } else {
      setAnsweredState(AnsweredState.WRONG);
      setCounter(0)
    }
  }
  
  useEffect(() => {
    setThreeRandomIdioms(getThreeRandomUniqueIdioms());
    setTargetIdiomIndex(Math.floor(Math.random() * 3))
  }, [])

  return (isReady &&
    <div className={'flex flex-col items-center justify-center min-h-screen space-y-3 px-2'}>
      <h1 className={'text-xl font-black text-gray-700'}>Was bedeutet dass denn?</h1>
      <p className={'bg-white p-2 italic'}>
        "{targetIdiom?.phrase}"
      </p>
      <ul className={'space-y-2 flex flex-col sm:flex-row sm:space-x-2'}>
        {threeRandomIdioms.map((idiom, index) => (
            <li key={idiom.meaning}>
              <Answer text={idiom.meaning} onClick={() => onOptionClick(idiom, index)} isDisabled={answeredState !== AnsweredState.UNANSWERED} isSelected={index === selectedIdiomIndex} isCorrectAnswer={index === targetIdiomIndex} answeredState={answeredState} />
            </li>
        ))}
      </ul>
      {answeredState !== AnsweredState.UNANSWERED && <div className={'bg-white text-gray-500 p-3 max-w-md text-center'}>{targetIdiom.explanation}</div>}
      <Result onReset={reset} answeredState={answeredState} />
      <div className={'absolute bottom-10 p-2'}>Correct: {counter}</div>
    </div>
  )
}

export default App
