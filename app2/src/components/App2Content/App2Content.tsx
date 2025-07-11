import React from "react";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import Widget_03 from "../Widget_03/Widget_03";
import Widget_04 from "../Widget_04/Widget_04";

export default function App2Content() {
  return (
      <div>
          <h1>App 2</h1>

          <Widget_03/>
          <Widget_04/>

          <Button label="Check" icon="pi pi-check"/>
      </div>
)
    ;
}
