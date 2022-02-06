import React from "react";

function AddItemControls(props) {
  const { parentCall } = { ...props };
  return (
    <button className={`btn btn-link self-end text-white -mr-4`} onClick={parentCall.clearChecked}>
      Clear checked
    </button>
  );
}

export default AddItemControls;
