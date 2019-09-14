import React from "react";
import Slider from "@material-ui/core/Slider";
import "./index.scss";

// Points on map data
import { data } from "../../data/data";

const Zip = props => {
  const [zipValue, setZipValue] = React.useState(0);
  const numberOfMapPoints = data.lines.length - 1;

  const handleChange = (_, value) => {
    setZipValue(value);
    props.handleCurrentPosition(value);
  };

  return (
    <div className="zip_container">
      <Slider onChange={handleChange} value={zipValue} min={0} max={numberOfMapPoints} />
      <label className="zip_label">Move train</label>
    </div>
  );
};

export default Zip;
