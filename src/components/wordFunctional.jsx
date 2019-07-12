import React, { useState, Fragment } from "react";
import { useAxios } from "../utils/hooks";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import PropTypes from "prop-types";

const WordFunctional = props => {
  const { word, shouldPreload, url } = props;

  const [loadData, setLoadData] = useState(shouldPreload);
  const [isActive, setActive] = useState(false);
  const [isVisited, setVisited] = useState(false);
  // Importing a custom data-fetching hook!
  const [definition, isPreLoading, isError] = useAxios(url, loadData);

  // Allows us to see data coming in if preloading
  const getButtonVariant = () => {
    if (isError) return "danger";
    if (isPreLoading) return "warning";
    return isActive ? "primary" : "light";
  };

  // Note: I only need async here in the event that we are loading data on click
  const handleClick = async () => {
    setActive(!isActive); // Set button state
    setVisited(true);

    // If loading defs on clicks, do a lookup on "open" clicks (only look-up if no cached definition)
    if (!shouldPreload && !definition) {
      setLoadData(true); // Set dependent hook prop to trigger load
    }
  };

  // Setting up the popover content... somewhat cautiously
  const composeDefinitionMarkup = () => {
    let markup;
    if (isError) return "Network error loading data. Please try again later.";

    if (definition) {
      try {
        markup = Object.keys(definition).map(defType => (
          <p key={defType}>
            <strong>{defType}</strong>: {definition[defType][0].definition}
          </p>
        ));
      } catch (e) {
        console.log("err: ", e);
        markup = "Error reading data structure";
      }
    }

    return markup ? markup : "Fetching. Hang on...";
  };

  // Set up popover element with definition or error message
  const popover = (
    <Popover id="popover-basic" title={word.term}>
      {composeDefinitionMarkup()}
    </Popover>
  );

  return (
    <Fragment>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button
          variant={getButtonVariant()}
          size="sm"
          className={isVisited ? "word word--visited" : "word"}
          disabled={isPreLoading ? true : false}
          onClick={handleClick}
        >
          {isPreLoading ? "...loading" : word}
        </Button>
      </OverlayTrigger>
    </Fragment>
  );
};

// A bit of type checking for good measure
WordFunctional.propTypes = {
  url: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  shouldPreload: PropTypes.bool
};

export default WordFunctional;
