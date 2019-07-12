import React, { useState } from "react";

const FilterInput = () => {
  const [text, setText] = useState("");
  const readInput = ({ currentTarget }) => {
    console.log(currentTarget.value);
    const { value } = currentTarget;
    setText(value);
  };
  return (
    <div className="word-list__header__search">
      <input
        className="form-control"
        type="text"
        placeholder="Filter words"
        onChange={readInput}
      />
    </div>
  );
};

export default FilterInput;
