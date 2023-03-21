import React from "react";
import useLocalStorage from "./useLocalStorage";
const account1 = {
  owner: "Eloy Bernardez",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "es-AR", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const initialAccounts = [account1, account2];

const useGetUsers = () => {
  const [accounts, setAccounts] = useLocalStorage("accounts", initialAccounts);
  const [currentAccount, setCurrentAccount] = React.useState({});

  const handleUser = (newUser) => {
    setCurrentAccount(newUser);
  };

  const handleAccounts = (newAccounts) => {
    setAccounts(newAccounts);
  };

  const createUserName = (account) => {
    return account?.owner
      ?.toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  };

  const fullBalance = currentAccount.movements?.reduce(
    (totalAmount, currentMovement) => {
      return totalAmount + currentMovement;
    },
    0
  );

  function validateAmount(value) {
    let error;
    if (value < 0) {
      error = "Amount must be positive";
    }
    return error;
  }

  function validatePin(user, pin) {
    let error;
    if (pin !== user.pin) {
      error = "Wrong PIN";
    }
    return error;
  }

  function validateUsername(userValue, value) {
    let error;
    if (value !== userValue) {
      error = "Wrong user!";
    }
    return error;
  }

  return {
    accounts,
    currentAccount,
    handleUser,
    handleAccounts,
    createUserName,
    fullBalance,
    validateAmount,
    validatePin,
    validateUsername,
  };
};

export default useGetUsers;