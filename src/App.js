import React from "react";
import Components from "./components";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Components.Header />
        <Components.About />
        <Components.Projects />
        <Components.Resume />
        <Components.Footer />
      </div>
    );
  }
}