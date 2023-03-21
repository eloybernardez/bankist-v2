import React, { useState } from "react";
import Movements from "../containers/Movements";
import Operations from "../containers/Operations";
import Balance from "../components/Balance";
import Summary from "../components/Summary";
import TransferOperation from "../components/TransferOperation";
import LoanOperation from "../components/LoanOperation";
import CloseAccount from "../components/CloseAccount";
import Timer from "../components/Timer";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import useTime from "../hooks/useTime";

const Main = () => {
  const [sorted, setSorted] = useState(false);
  const { submitted, setSubmitted } = useContext(AppContext);

  const { time, resetTime } = useTime();

  const handleSorted = () => {
    setSorted((sorted) => !sorted);
  };

  return (
    <main className={`app ${submitted ? "show" : "hide"}`}>
      {submitted && (
        <>
          <Balance />
          <Movements sorted={sorted} />
          <Summary handleSorted={handleSorted} />

          <Operations>
            <TransferOperation resetTime={resetTime} />
            <LoanOperation resetTime={resetTime} />
            <CloseAccount resetTime={resetTime} />
          </Operations>

          <Timer
            setSubmitted={setSubmitted}
            time={time}
            resetTime={resetTime}
          />
        </>
      )}
    </main>
  );
};

export default Main;
