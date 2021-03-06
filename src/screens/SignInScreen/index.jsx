import React, { useContext, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppState from "../../context";
import Navigation from "../../components/Navigation";
import "./index.scss";

const SignInScreen = ({ history: { push } }) => {
  const {
    ticketNumber,
    setTicketNumber,
    login,
    setLogin,
    password,
    setPassword
  } = useContext(AppState);
  const handleSubmit = useCallback(() => {
    if ((ticketNumber, login, password)) {
      push("/journey");
    }
  }, [ticketNumber, push, login, password]);

  return (
    <div className="sign-in">
      <Navigation />
      <form className="sign-in__form">
        <TextField
          label="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <TextField
          type={"password"}
          label="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <TextField
          label="Numer biletu"
          value={ticketNumber}
          onChange={e => setTicketNumber(e.target.value)}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#263761", width: "100%" }}
          onClick={handleSubmit}
        >
          Rozpocznij podróż
        </Button>
      </form>
    </div>
  );
};

export default SignInScreen;
