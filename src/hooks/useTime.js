import { useContext, useState, useEffect } from "react";
import AccountsContext from "../context/AccountsContext";
import AppContext from "../context/AppContext";

const INITIAL_TIME = 120;

const useTime = () => {
  const [time, setTime] = useState(INITIAL_TIME);
  const [stopTimer, setStopTimer] = useState(false);
  const { submitted, setSubmitted } = useContext(AppContext);
  const { handleUser } = useContext(AccountsContext);

  const resetTime = () => {
    setStopTimer(true);
    setTime(INITIAL_TIME);
  };

  useEffect(() => {
    // Decrease 1s every second

    let intervalId;
    if (time > 0 && submitted && !stopTimer) {
      intervalId = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (time === 0) {
      // Log out user
      setSubmitted(false);

      // Change account
      handleUser({});

      // Reset time
      resetTime();
    } else if (stopTimer) {
      clearInterval(intervalId);
      resetTime();
      setStopTimer(false);
    }
  }, [time, submitted, stopTimer]);

  return { time, resetTime };
};

export default useTime;
