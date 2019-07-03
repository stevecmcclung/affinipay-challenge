import React from "react";
import WordList from "./components/wordList";
import "./styles/app.scss";

function App() {
  return (
    <div>
      <main className="container my-5">
        <WordList />
      </main>
    </div>
  );
}

export default App;
