import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = () => {
  const [priceFilters, setPriceFilters] = useState({
    cheap: false,
    moderate: false,
    expensive: false
  });

  const [locationFilters, setLocationFilters] = useState({
    downtown: false,
    suburb: false,
    countryside: false
  });

  const [roomTypeFilters, setRoomTypeFilters] = useState({
    single: false,
    double: false,
    suite: false
  });

  const [facilityFilters, setFacilityFilters] = useState({
    wifi: false,
    parking: false,
    pool: false
  });

  const handlePriceChange = (filter) => {
    setPriceFilters({ ...priceFilters, [filter]: !priceFilters[filter] });
  };

  const handleLocationChange = (filter) => {
    setLocationFilters({ ...locationFilters, [filter]: !locationFilters[filter] });
  };

  const handleRoomTypeChange = (filter) => {
    setRoomTypeFilters({ ...roomTypeFilters, [filter]: !roomTypeFilters[filter] });
  };

  const handleFacilityChange = (filter) => {
    setFacilityFilters({ ...facilityFilters, [filter]: !facilityFilters[filter] });
  };

  return (
    <div id="filterbar">
      <div className="filter-option">
        <h4>Price</h4>
        <label>
          <input
            type="checkbox"
            checked={priceFilters.cheap}
            onChange={() => handlePriceChange("cheap")}
          />
          Cheap
        </label>
        <label>
          <input
            type="checkbox"
            checked={priceFilters.moderate}
            onChange={() => handlePriceChange("moderate")}
          />
          Moderate
        </label>
        <label>
          <input
            type="checkbox"
            checked={priceFilters.expensive}
            onChange={() => handlePriceChange("expensive")}
          />
          Expensive
        </label>
      </div>
      <div className="filter-option">
        <h4>Location</h4>
        <label>
          <input
            type="checkbox"
            checked={locationFilters.downtown}
            onChange={() => handleLocationChange("downtown")}
          />
          Downtown
        </label>
        <label>
          <input
            type="checkbox"
            checked={locationFilters.suburb}
            onChange={() => handleLocationChange("suburb")}
          />
          Suburb
        </label>
        <label>
          <input
            type="checkbox"
            checked={locationFilters.countryside}
            onChange={() => handleLocationChange("countryside")}
          />
          Countryside
        </label>
      </div>
      <div className="filter-option">
        <h4>Room Type</h4>
        <label>
          <input
            type="checkbox"
            checked={roomTypeFilters.single}
            onChange={() => handleRoomTypeChange("single")}
          />
          Single
        </label>
        <label>
          <input
            type="checkbox"
            checked={roomTypeFilters.double}
            onChange={() => handleRoomTypeChange("double")}
          />
          Double
        </label>
        <label>
          <input
            type="checkbox"
            checked={roomTypeFilters.suite}
            onChange={() => handleRoomTypeChange("suite")}
          />
          Suite
        </label>
      </div>
      <div className="filter-option">
        <h4>Facilities</h4>
        <label>
          <input
            type="checkbox"
            checked={facilityFilters.wifi}
            onChange={() => handleFacilityChange("wifi")}
          />
          Wifi
        </label>
        <label>
          <input
            type="checkbox"
            checked={facilityFilters.parking}
            onChange={() => handleFacilityChange("parking")}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            checked={facilityFilters.pool}
            onChange={() => handleFacilityChange("pool")}
          />
          Pool
        </label>
      </div>
    </div>
  );
};

export default FilterBar;
