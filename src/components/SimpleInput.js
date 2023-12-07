import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

  const {
    value: enteredName,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    valueIsValid : enteredNameIsValid,
    hasError: enteredNameIsInvalid,
    reset: resetName
  } = useInput(value => value.trim() !== '')

  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    value: enteredEmail,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    valueIsValid : enteredEmailIsValid,
    hasError: enteredEmailIsInvalid,
    reset: resetEmail
  } = useInput(value => value.match(validEmailRegex))

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid){
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if(!formIsValid){
      return;
    }

    console.log(`${enteredName} - ${enteredEmail}`);

    resetName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={`form-control ${enteredNameIsInvalid && 'invalid'}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
      </div>
      {enteredNameIsInvalid && <p className="error-text">Name must not be empty.</p>}

      <div className={`form-control ${enteredEmailIsInvalid && 'invalid'}`}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
      </div>
      {enteredEmailIsInvalid && <p className="error-text">Email must be valid.</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
