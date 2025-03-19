import AnsweredState from "../types/AnsweredState.ts";

const calcIconToShow = (answeredState: AnsweredState, isCorrectAnswer: boolean) => {
    if(answeredState === AnsweredState.UNANSWERED) return;

    if(isCorrectAnswer) {
        return '✅'
    } else {
        return '❌'
    }
}

interface Props {
    text: string;
    onClick: () => void;
    isDisabled: boolean;
    isSelected: boolean;
    isCorrectAnswer: boolean;
    answeredState: AnsweredState
}

const calcSelectedClass= (isSelected: boolean, isCorrect: boolean) => {
    const classes = ['border-2'];

    if(isSelected) {
        if(isCorrect) {
            classes.push('border-green-700')
        } else {
            classes.push('border-red-900')
        }
    } else {
        classes.push('border-transparent')
    }

    return classes.join(' ');
};

export const Answer = ({text, onClick, isDisabled, isSelected, isCorrectAnswer, answeredState}: Props) => {


    return (
        <button onClick={onClick} disabled={isDisabled} className={`bg-purple-200 p-3 w-full border cursor-pointer hover:bg-purple-300 disabled:cursor-default disabled:hover:bg-purple-200 ${calcSelectedClass(isSelected, isCorrectAnswer)}`}>
            {calcIconToShow(answeredState, isCorrectAnswer)} {text}
        </button>
    )
}
