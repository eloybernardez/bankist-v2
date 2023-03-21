import React, { useContext } from "react";
import AccountsContext from "../context/AccountsContext";
import useInitialState from "../hooks/useInitialState";
import "../styles/Balance.css";

const Balance = () => {
  const { currentAccount, fullBalance } = useContext(AccountsContext);
  const { formatCur } = useInitialState();

  const formattedBalance = (account) =>
    formatCur(fullBalance, account.locale, account.currency);

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const currentDate = (account) =>
    new Intl.DateTimeFormat(account.locale, options).format(now);

  return (
    <>
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{currentDate(currentAccount)}</span>
          </p>
        </div>
        <p className="balance__value">{formattedBalance(currentAccount)}</p>
      </div>
    </>
  );
};

export default Balance;
