import React, { Component } from "react";
import data from "./Footer.data";
import "./Footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="contact-links">
              {data.contacts && data.contacts.map((item) => {
                return (<li><a className="footer-link" target="_blank" rel="noopener noreferrer" href={item.link}><i className={item.icon} /></a></li>)
              })}
            </ul>
          </div>
          <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open" /></a></div>
        </div>
      </footer>
    );
  }
}
