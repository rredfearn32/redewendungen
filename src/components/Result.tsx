import AnsweredState from "../types/AnsweredState.ts";

interface Props {
    answeredState: AnsweredState;
    onReset: () => void;
}

export const Result = ({answeredState, onReset}: Props) => {
    if(answeredState === AnsweredState.UNANSWERED) return;

    return (
        <button onClick={onReset} className={'bg-gray-600 hover:bg-gray-700 text-white p-3 cursor-pointer'}>Next ➡️</button>
    )
}
