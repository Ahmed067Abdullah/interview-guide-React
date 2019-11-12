import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./Auth.styles";
import { signin, signup } from "./Auth.service";
import Button from "../../components/Button/Button";
import { Formik } from "formik";
import InputField from "../../components/InputField/InputField";
import PasswordInputField from "../../components/InputField/PasswordInputField";

const Auth = ({ classes, user, callSignin, callSignup, history }) => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorSignin, setErrorSignin] = useState("");
  const [errorSignup, setErrorSignup] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsSigningIn(!isSigningIn);
  };

  const togglePasswordField = () => {
    setShowPassword(!showPassword);
  };

  let heading = "Sign Up";
  let toggleText = "Already have an account?";
  let toggleLink = "Sign in";
  let error = errorSignup;
  if (isSigningIn) {
    heading = "Sign In";
    toggleText = "Don't have an account?";
    toggleLink = "Sign up";
    error = errorSignin;
  }

  return (
    <div className={classes["auth-container"]}>
      <div className={classes["auth-card"]}>
        <p className={classes["main-heading"]}>{heading}</p>
        <p className={classes["error-text"]}>{error}</p>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          validate={values => {
            const errors = {};
            if (!values.email.trim()) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password.trim()) {
              errors.password = "Required";
            }
            if (!(isSigningIn || values.name.trim())) {
              errors.name = "Required";
            }
            return errors;
          }}
          onSubmit={values => {
            const { name, email, password } = values;
            setLoading(true);
            if (isSigningIn) {
              callSignin({ email, password }, history).catch(err => {
                setErrorSignin(err);
                setLoading(false);
              });
            } else {
              callSignup({ name, email, password }, history).catch(err => {
                setErrorSignup(err);
                setLoading(false);
              });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                width: "350px",
                pointerEvents: loading ? "none" : "",
              }}
            >
              {isSigningIn ? null : (
                <InputField
                  id="name"
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && errors.name}
                />
              )}
              <InputField
                id="email"
                name="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
              />
              <PasswordInputField
                id="password"
                type={showPassword ? "text": "password"}
                name="password"
                label="Password"
                onChange={handleChange}
                handleToggle={togglePasswordField}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
              />
              <Button
                type="submit"
                disabled={loading}
                className={classes["submit-btn"]}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
        <p
          className={classes["toggle-text"]}
          style={{
            pointerEvents: loading ? "none" : "",
          }}
        >
          {toggleText}
          <span className={classes["toggle-link"]} onClick={toggleForm}>
            {toggleLink}
          </span>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  callSignin: (user, history) => dispatch(signin(user, history)),
  callSignup: (user, history) => dispatch(signup(user, history)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Auth));
