import React from "react";
import Spinner from "./Spinner";

function LoadingScreen(props) {
  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm ${props.dataIsLoading ? "" : "hidden"}`}>
      <Spinner />
    </div>
  );
}

export default LoadingScreen;
