import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import useInput from "../hooks/use-input";
import classes from "./Auth.module.css";

const Auth = () => {
  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailNameInput,
  } = useInput(isNotEmpty);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const dispatch = useDispatch();
  const loginHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    resetEmailNameInput();
    resetPasswordInput();

    dispatch(authActions.login());
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className="error-text">Email address is empty</p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className="error-text">Password is empty</p>
            )}
            
          </div>
          <button disabled={!formIsValid}>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
