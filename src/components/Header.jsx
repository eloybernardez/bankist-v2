import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import Logo from "../assets/images/logo.png";
import AppContext from "../context/AppContext";
import AccountsContext from "../context/AccountsContext";
import { BsArrowRight } from "react-icons/bs";
import "../styles/Header.css";

const Header = () => {
  const { accounts, currentAccount, handleUser, createUserName } =
    useContext(AccountsContext);
  const { submitted, setSubmitted } = useContext(AppContext);

  const [welcome, setWelcome] = useState("Log in to get started");

  const correctUser = (acc) => {
    return accounts.find(
      (account) =>
        createUserName(account) === acc.user &&
        Number(acc.password) === account.pin
    );
  };

  useEffect(() => {
    if (submitted) {
      setWelcome(`Welcome, ${currentAccount.owner.split(" ")[0]} 🤗`);
    } else {
      setWelcome("Log in to get started");
    }
  }, [submitted, currentAccount.owner]);

  return (
    <nav>
      <p className="welcome">{welcome}</p>
      <img src={Logo} alt="Logo" className="logo" />
      <Formik
        initialValues={{ user: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.user) {
            errors.user = "Required";
          } else if (!correctUser(values)) {
            errors.user = "Invalid user or password";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleUser(correctUser(values));

          setSubmitting(false);
          setSubmitted(true);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleReset,
          isSubmitting,
          isValid,
        }) => (
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__inputs__container">
              <input
                type="text"
                name="user"
                placeholder="user"
                className={`login__input login__input--user ${
                  touched.user && !isValid ? "login__input--error" : ""
                } `}
                onChange={handleChange}
                value={values.user}
                disabled={submitted}
              />

              <input
                type="password"
                name="password"
                placeholder="PIN"
                maxLength={4}
                className={`login__input login__input--pin ${
                  touched.user && !isValid ? "login__input--error" : ""
                } `}
                onChange={handleChange}
                value={values.password}
                disabled={submitted}
              />
              <div className="invalid-form">
                {errors.user && touched.user && errors.user}
              </div>
            </div>

            <button
              type="submit"
              className="login__btn"
              disabled={submitted || isSubmitting}
              onReset={handleReset}
            >
              <BsArrowRight className="btn--arrow btn--arrow-header" />
            </button>
          </form>
        )}
      </Formik>
    </nav>
  );
};

export default Header;
