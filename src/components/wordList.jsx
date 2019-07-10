import React, { Component } from "react";
import { getWords } from "../services/fakeWordsService";
import defUrl from "../utils/api";
import Word from "./word";

class Words extends Component {
  state = {
    words: [],
    showModal: false,
    targetWord: "",
    targetDef: ""
  };

  async componentDidMount() {
    // Words in local state are now objects and have: id, term, definition.
    const words = getWords();
    this.setState({ words });
  }

  /**
   * Save definition to its word in local state
   */
  handleCacheDefinition = (id, def) => {
    const words = [...this.state.words];
    const targetWord = words.find(w => w._id === id);
    targetWord.definition = def;
    this.setState({ words });
  };

  render() {
    return (
      <div className="word-list">
        <h5 className="word-list__header">Words of Latin Origin</h5>
        <div className="word-list__body">
          {this.state.words.map(word => (
            <Word
              key={word._id}
              url={defUrl(word.term)}
              word={word}
              preload={false}
              onLookup={this.handleCacheDefinition}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Words;
