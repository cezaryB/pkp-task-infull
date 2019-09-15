import React from "react";
import MapboxService from "../../features/map/map.service";
import UserPointerService from "../../features/map/user-pointer.service";
import applyMarkers from "../../features/map/apply.markers";
import idea from "../../resources/idea.svg";
import "./index.scss";
import Modal from "../Modal";

let map;

class Map extends React.Component {
  state = {
    modalVisible: false,
    markerSelected: "",
    quizPoints: 0,
    resolvedQuizes: []
  };

  async componentDidMount() {
    map = await MapboxService.bootstrapMap();
    applyMarkers(map, idea, this.handleMarkerClick);
  }

  handleMarkerClick = markerName => {
    this.setState({
      modalVisible: true,
      markerSelected: markerName
    });
  };

  moveMap = newCoords => {
    UserPointerService.movePointer(map, newCoords);
    map.setCenter(newCoords);
  };

  componentDidUpdate(prevProps, prevState) {
    const newCoords = [
      this.props.pointerPosition.latitude,
      this.props.pointerPosition.longitude
    ];

    this.moveMap(newCoords);

    if (prevState.quizPoints !== this.state.quizPoints) {
      this.props.updateUserPoints(this.state.quizPoints);
    }
  }

  addQuizPoints = (quizPoints, quizName) =>
    this.setState(state => ({
      quizPoints: state.quizPoints + quizPoints,
      resolvedQuizes: [...state.resolvedQuizes, { quizName, quizPoints }]
    }));

  getCurrentQuizPoints = () =>
    this.state.resolvedQuizes.find(quiz =>
      quiz.quizName === this.state.markerSelected
    );

  render() {
    const { modalVisible, markerSelected, resolvedQuizes } = this.state;
    return (
      <React.Fragment>
        <div id="map" />
        {modalVisible && (
          <Modal
            markerSelected={markerSelected}
            addQuizPoints={this.addQuizPoints}
            resolvedQuizes={resolvedQuizes}
            currentModalQuizPoints={this.getCurrentQuizPoints()}
            closeModal={() => this.setState({ modalVisible: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Map;
