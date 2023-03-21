import React from "react";
import { useContext } from "react";
import useInitialState from "../hooks/useInitialState";
import AccountsContext from "../context/AccountsContext";
import "../styles/MovementItem.css";

const MovementItem = ({ movementAmount }) => {
  const { formatCur } = useInitialState();
  const { currentAccount } = useContext(AccountsContext);

  const movementIndex = currentAccount.movements.findIndex(
    (movement) => movement === movementAmount
  );

  // Date operations:
  const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(date);
  };

  const date = new Date(currentAccount.movementsDates[movementIndex]);
  const displayDate = formatMovementDate(date, currentAccount.locale);

  //////////////////////////////////////////////////////////////////////////////

  // Amount operations:

  const formattedMov = formatCur(
    movementAmount < 0 ? -movementAmount : movementAmount,
    currentAccount.locale,
    currentAccount.currency
  );

  const typeOfOperation = movementAmount < 0 ? "withdrawal" : "deposit";
  //////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="movements__row">
        <div className={`movements__type movements__type--${typeOfOperation}`}>
          {`${movementIndex + 1} ${typeOfOperation}`}
        </div>
        <div className="movements__date">{displayDate}</div>
        <div className="movements__value">{formattedMov}</div>
      </div>
    </>
  );
};

export default MovementItem;
