import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex bg-gray-200 p-10">
      <div className="flex-grow flex">
        <Link to="/">MF Sandbox</Link>
        <div className="mx-5">|</div>
        <Link to="/any-example-page">Page&#60;T&#62;</Link>
      </div>
    </header>
  );
}
