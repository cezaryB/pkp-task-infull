import React from "react";
import Modal from "../Modal";

class Ticket extends React.Component {
  state = {
    modalVisible: true,
    ticket: {
      origin: "Warszawa Centralna",
      destination: "Gdynia Główna"
    }
  };

  render() {
    const { modalVisible, ticket } = this.state;
    return (
      <React.Fragment>
        {modalVisible && (
          <Modal
            markerSelected={false}
            closeModal={() => this.setState({ modalVisible: false })}
          >
            <div>
              <h1>Witaj na pokladzie pociągu PKP</h1>
              <h2>Twoja podróż:</h2>
              <p>
                {ticket.origin} do {ticket.destination}
              </p>
              <p>Życzymy miłej podróży</p>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default Ticket;
