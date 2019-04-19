import React, { Component } from "react";
import data from "./Header.data";
import "./Header.scss";

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header id="home">
        <div className="header-image"></div>
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
              <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
              <li><a className="smoothscroll" href="#about">About</a></li>
              <li><a className="smoothscroll" href="#projects">Projects</a></li>
              <li><a className="smoothscroll" href="#resume">Resume</a></li>
            </ul>
          </nav>
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">Hi, I am {data.name}.</h1>
              <h3 style={{ color: '#fff', fontFamily: 'sans-serif ' }}>I am a {data.role}. {data.roleDescription}</h3>
            </div>
          </div>
          <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
          </p>
        </header>
      </React.Fragment>
    );
  }
}
