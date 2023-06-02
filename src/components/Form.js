import React from "react";

export default function Form({ inputValue, handleInputChange, showTryAgain }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Who's that Pokemon?"
        value={inputValue}
        onChange={handleInputChange}
      />
      {showTryAgain && <p>Try again!</p>}
    </div>
  );
}
