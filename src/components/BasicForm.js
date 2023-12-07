import useInput from "../hooks/use-input";

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameInputChangeHandler,
    valueBlurHandler: firstNameInputBlurHandler,
    valueIsValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameIsInvalid,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    valueChangeHandler: lastNameInputChangeHandler,
    valueBlurHandler: lastNameInputBlurHandler,
    valueIsValid: enteredLastNameIsValid,
    hasError: enteredLastNameIsInvalid,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    value: enteredEmail,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    valueIsValid: enteredEmailIsValid,
    hasError: enteredEmailIsInvalid,
    reset: resetEmail,
  } = useInput((value) => value.match(validEmailRegex));

  let formIsValid = false;

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(`${enteredFirstName} ${enteredLastName}`);
    console.log(enteredEmail);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div
          className={`form-control ${enteredFirstNameIsInvalid && "invalid"}`}
        >
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {enteredFirstNameIsInvalid && (
            <p className="error-text">First name must not be empty.</p>
          )}
        </div>

        <div
          className={`form-control ${enteredLastNameIsInvalid && "invalid"}`}
        >
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
          />
          {enteredLastNameIsInvalid && (
            <p className="error-text">Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${enteredEmailIsInvalid && "invalid"}`}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Email must be valid.</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
