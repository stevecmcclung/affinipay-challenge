import React, { Component } from "react";
import { getWords } from "../services/fakeWordsService";
import getUrl from "../utils/api";
import Word from "./word";

class Words extends Component {
  state = {
    words: [],
    showModal: false,
    targetWord: "",
    targetDef: ""
  };

  async componentDidMount() {
    const words = getWords();
    this.setState({ words });
  }

  /**
   * Save definition to our in-memory service object
   */
  handleCacheWord = (id, def) => {
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
              url={getUrl}
              word={word}
              preload={false}
              onLookup={this.handleCacheWord}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Words;
