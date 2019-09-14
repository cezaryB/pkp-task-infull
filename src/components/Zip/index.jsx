import React from "react";
import "./index.scss";

const Zip = (props) => {
  const [zipValue, setZipValue] = React.useState(0);

  const handleChange = () => e => {
    const value = 
    setZipValue(e.target.value);
    props.handleCurrentPosition(e.target.value)
  };

  return (
    <div className="zip_container">
      <input
        type="range"
        name="point-position"
        min="0"
        max="20"
        value={zipValue}
        onChange={handleChange()}
      />
      <label className="zip_label">Move train</label>
    </div>
  );
};

export default Zip;
