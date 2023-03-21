import React, { useContext } from "react";
import MovementItem from "../components/MovementItem";
import AccountsContext from "../context/AccountsContext";
import "../styles/Movements.css";

const Movements = ({ sorted }) => {
  const { currentAccount } = useContext(AccountsContext);

  return (
    <>
      <div className="movements">
        {!sorted &&
          currentAccount.movements
            .map((movementAmount, index) => (
              <MovementItem key={index} movementAmount={movementAmount} />
            ))
            .reverse()}
        {sorted &&
          currentAccount.movements.map((movementAmount, index) => (
            <MovementItem key={index} movementAmount={movementAmount} />
          ))}
      </div>
    </>
  );
};

export default Movements;
