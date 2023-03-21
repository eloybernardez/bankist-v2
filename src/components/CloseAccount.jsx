import React, { useContext } from "react";
import Modal from "./Modal";
import { Formik, Form, Field } from "formik";
import AccountsContext from "../context/AccountsContext";
import useInitialState from "../hooks/useInitialState";
import AppContext from "../context/AppContext";
import { BsArrowRight } from "react-icons/bs";

const CloseAccount = ({ resetTime }) => {
  const {
    currentAccount,
    createUserName,
    accounts,
    handleAccounts,
    handleUser,
    validatePin,
    validateUsername,
  } = useContext(AccountsContext);

  // const { resetTime } = useTime();
  const { showModal, setShowModal } = useInitialState();
  const { handleSubmitted } = useContext(AppContext);

  return (
    <div className="operation operation--close">
      <h2>Close account</h2>

      <Formik
        initialValues={{
          username: "",
          pin: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = "Required";
          } else if (createUserName(currentAccount) !== values.username) {
            errors.username = validateUsername(
              createUserName(currentAccount),
              values.username
            );
          }

          if (!values.pin) {
            errors.pin = "Required";
          } else if (Number(values.pin) !== currentAccount.pin) {
            errors.pin = validatePin(currentAccount, Number(values.pin));
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          // Get accounts without the current one
          const finalAccounts = accounts.filter(
            (account) => createUserName(account) !== values.username
          );

          // Add modal to show that the account has been closed

          // Logout
          handleUser({});
          handleSubmitted();

          // Eliminate account
          handleAccounts([...finalAccounts]);

          // Reset the timer
          resetTime();

          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="form form--close">
            <Field
              name="username"
              className={`form__input form__input--user ${
                touched.username && errors.username
                  ? "form__input--close-error"
                  : ""
              }`}
              placeholder="User"
            />

            <Field
              name="pin"
              type="password"
              maxLength={4}
              className={`form__input form__input--pin ${
                touched.pin && errors.pin ? "form__input--close-error" : ""
              }`}
              placeholder="PIN"
            />

            <button type="submit" className="form__btn form__btn--close">
              <BsArrowRight className="btn--arrow btn--arrow-header" />
            </button>
            <div className="error-message">
              {errors.username && touched.username && errors.username}
            </div>

            <div className="error-message">
              {errors.pin && touched.pin && errors.pin}
            </div>

            {showModal && (
              <Modal
                setShowModal={setShowModal}
                operationText={`You have closed your account successfully!`}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Add React.memo for prevent unnecessary rerenders while props don't change

export default React.memo(CloseAccount);
