import React from "react";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="devMode">
      <div class="error">404</div>
      <br />
      <br />
      <span class="info">
        File not found
        <br></br>
        in dev mode!
      </span>

      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        class="static"
      />
    </div>
  );
};
