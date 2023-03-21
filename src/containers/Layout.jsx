import React from "react";
import Header from "../components/Header";
import Main from "./Main";
import AppContext from "../context/AppContext";
import AccountsContext from "../context/AccountsContext";
import useGetUsers from "../hooks/useGetUsers";
import "../styles/Layout.css";
import useInitialState from "../hooks/useInitialState";

const Layout = () => {
  const initialAccounts = useGetUsers();
  const { submitted, setSubmitted } = useInitialState();

  return (
    <AccountsContext.Provider value={initialAccounts}>
      <AppContext.Provider value={{ submitted, setSubmitted }}>
        <Header />
        <Main />
      </AppContext.Provider>
    </AccountsContext.Provider>
  );
};

export default Layout;
