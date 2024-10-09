import React from "react";

function Loader() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="animate-spin h-5 w-5 mr-3 border border-t-2 border-b-2 border-blue rounded-full "></div>
      Loading...
    </div>
  );
}

export default Loader;
