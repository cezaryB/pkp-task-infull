import React from "react";
import Slider from "@material-ui/core/Slider";
import "./index.scss";

const Zip = props => {
  const [zipValue, setZipValue] = React.useState(0);

  const handleChange = (_, value) => {
    setZipValue(value);
    props.handleCurrentPosition(value);
  };

  return (
    <div className="zip_container">
      <Slider onChange={handleChange} value={zipValue} min={0} max={20} />
      <label className="zip_label">Move train</label>
    </div>
  );
};

export default Zip;
