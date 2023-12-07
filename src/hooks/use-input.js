import { useReducer } from "react";

const initialInputValue = {
    value: '',
    isTouched: false,
}

const inputStateReducer = (state, action) => {

    if(action.type === 'INPUT'){
        return {
            value: action.value,
            isTouched: state.isTouched,
        }
    }
    if(action.type === 'BLUR'){
        return {
            value: state.value,
            isTouched: true,
        }
    }
    if(action.type === 'RESET'){
        return {
            value: '',
            isTouched: false,
        }
    }

    return inputStateReducer

}

const useInput = (validateInput) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputValue);

  const valueIsValid = validateInput(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
  };

  const valueBlurHandler = () => {
    dispatch({type: 'BLUR'})

  }

  const reset = () => {
    dispatch({type: 'RESET'})
  }

  return {
    value: inputState.value,
    valueChangeHandler,
    valueBlurHandler,
    valueIsValid,
    hasError,
    reset
  }

};

export default useInput;
