import React from "react";

const Action = ({ handleClick, type, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {type}
    </button>
  );
};

export default Action;
