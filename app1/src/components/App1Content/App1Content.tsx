import React from "react";

import Widget_01 from "../Widget_01/Widget_01";
import Widget_02 from "../Widget_02/Widget_02";

import "../../index.scss";

export default function App1Content() {
  return (
    <div>
      <h1 className="font-bold text-3xl">App 1</h1>

      <div className="grid grid-cols-2 gap-5">
        <Widget_01 />
        <Widget_02 />
      </div>
    </div>
  );
}
