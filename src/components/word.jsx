import React, { Component, Fragment } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import PropTypes from "prop-types";

class Word extends Component {
  state = {
    isActive: false,
    visited: false,
    localDefinition: null,
    isLoading: this.props.preload,
    isError: false
  };

  /**
   * Using this hook when preloading data for each word
   */
  async componentDidMount() {
    const { word, url, preload } = this.props;
    if (preload) {
      const localDefinition = await this.fetchData(url(word.term));
      this.setState({ localDefinition, isLoading: false });
    }
  }

  /**
   * Note: I only need async here in the event that we are loading data on click
   */
  handleClick = async () => {
    const { word, url, onLookup, preload } = this.props;
    const isActive = !this.state.isActive;

    // Toggle button variant
    this.setState({ isActive, visited: true });

    // If loading defs on clicks, do a lookup on "open" clicks
    if (!preload && isActive && !word.definition) {
      const definitionData = await this.fetchData(url(word.term));
      onLookup(word._id, definitionData);
    }
  };

  /**
   * We will call this in a couple of different places depending on preload prop
   */
  fetchData = async url => {
    let definition = null;
    try {
      const { data } = await Axios.get(url);
      definition = data[0].meaning;
    } catch (e) {
      this.setState({ isError: true });
    }
    return definition;
  };

  /**
   * Allows us to see data coming in if preloading
   */
  getButtonVariant = () => {
    const { isLoading, isActive, isError } = this.state;
    if (isError) return "danger";
    if (isLoading) return "warning";
    return isActive ? "primary" : "light";
  };

  /**
   * Setting up the popover content... somewhat cautiously
   */
  composeDefinitionMarkup = defArray => {
    let markup;
    if (this.state.isError)
      return "Network error loading data. Please try again later.";

    try {
      markup = Object.keys(defArray).map(defType => (
        <p key={defType}>
          <strong>{defType}</strong>: {defArray[defType][0].definition}
        </p>
      ));
    } catch (e) {
      markup = "Error reading data structure";
    }
    return defArray ? markup : "Fetching. Hang on...";
  };

  render() {
    const { word, preload } = this.props;
    const { localDefinition, isLoading, visited } = this.state;
    const wordClass = visited ? "word word--visited" : "word";

    // The definition can come from either local state or props
    const definition = preload ? localDefinition : word.definition;

    const popover = (
      <Popover id="popover-basic" title={word.term}>
        {this.composeDefinitionMarkup(definition)}
      </Popover>
    );

    return (
      <Fragment>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button
            variant={this.getButtonVariant()}
            size="sm"
            className={wordClass}
            disabled={isLoading ? true : false}
            onClick={this.handleClick}
          >
            {isLoading ? "...loading" : word.term}
          </Button>
        </OverlayTrigger>
      </Fragment>
    );
  }
}

// A bit of type checking for good measure
Word.propTypes = {
  url: PropTypes.func.isRequired,
  word: PropTypes.object.isRequired,
  preload: PropTypes.bool,
  onLookup: PropTypes.func.isRequired
};

export default Word;
