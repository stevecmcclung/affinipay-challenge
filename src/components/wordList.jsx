import React, { Component } from "react";
import { getWords } from "../services/fakeWordsService";
import defUrl from "../utils/api";
import WordFunctional from "./wordFunctional";
import FilterInput from "./filterInput";

class Words extends Component {
  state = {
    words: []
  };

  async componentDidMount() {
    // Words in local state are now objects and have: id, term, definition.
    const words = getWords("latin");
    this.setState({ words });
  }

  /**
   * Save definition to its word in local state
   */
  /*   handleUpdateWord = (id, def) => {
    const words = [...this.state.words];
    const targetWord = words.find(w => w._id === id);
    targetWord.definition = def;
    this.setState({ words });
  }; */

  render() {
    return (
      <section className="word-list">
        <header className="word-list__header">
          <h5 className="word-list__header__title">Words of Latin Origin</h5>
          <FilterInput />
        </header>
        <div className="word-list__body">
          {this.state.words.map(wordObj => (
            <WordFunctional
              key={wordObj._id}
              url={defUrl(wordObj.word)}
              word={wordObj.word}
              shouldPreload={false}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default Words;
