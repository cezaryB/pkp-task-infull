import React, { useContext, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppState from "../../context";
import Navigation from "../../components/Navigation";
import "./index.scss";

const SignInScreen = ({ history: { push } }) => {
  const { ticketNumber, setTicketNumber } = useContext(AppState);
  const handleSubmit = useCallback(() => {
    if (ticketNumber) {
      push("/journey");
    }
  }, [ticketNumber]);

  return (
    <div className="sign-in">
      <Navigation />
      <form className="sign-in__form">
        <TextField
          id="outline-required"
          label="Login"
          value={ticketNumber}
          onChange={e => setTicketNumber(e.target.value)}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <TextField
          type={"password"}
          id="outline-required"
          label="Hasło"
          value={ticketNumber}
          onChange={e => setTicketNumber(e.target.value)}
          margin="normal"
          variant="filled"
          style={{ width: "100%" }}
        />
        <TextField
          id="outline-required"
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
