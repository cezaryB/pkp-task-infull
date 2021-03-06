import React from "react";
import Modal from "../Modal";

class Ticket extends React.Component {
  state = {
    modalVisible: true,
    ticket: {
      origin: "Warszawa Centralna",
      destination: "Gdynia Główna",
      user: {
        name: "Cezary Burzykowski"
      }
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
            <div className='modal__ticket'>
              <h1>
                Witaj na pokladzie pociągu PKP Intercity
              </h1>
              <h2 className='modal__ticket-header'>
                Twoja podróż:
              </h2>
              <p>
                {ticket.origin} do {ticket.destination}
              </p>
              <p>
                Życzymy miłej podróży
              </p>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default Ticket;
