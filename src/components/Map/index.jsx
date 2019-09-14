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
    quizPoints: 0
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

  componentDidUpdate() {
    const newCoords = [
      this.props.pointerPosition.latitude,
      this.props.pointerPosition.longitude
    ];
    return this.moveMap(newCoords);
  }

  addQuizPoints = quizPoints =>
    this.setState(state => ({
      quizPoints: state.quizPoints + quizPoints
    }));

  render() {
    const { modalVisible, markerSelected } = this.state;
    return (
      <React.Fragment>
        <div id="map" />
        {modalVisible && (
          <Modal
            markerSelected={markerSelected}
            addQuizPoints={this.addQuizPoints}
            closeModal={() => this.setState({ modalVisible: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Map;
