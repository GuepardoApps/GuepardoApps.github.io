import React, { Component } from "react";
import data from "./Projects.data";
import "./Projects.scss";

export default class Porfolio extends Component {
  render() {
    return (
      <section id="projects">
        <p className="scrolldown">
          <a className="smoothscroll" href="#resume"><i className="icon-down-circle"></i></a>
        </p>
        <div className="row big-row">
          <div className="twelve columns collapsed">
            <h1>Have a look at some of my open source projects and participate in them.</h1>
            <div id="projects-wrapper" className="bgrid-fifth s-bgrid-fifth cf">
              {data.projects && data.projects.map((item) => {
                return (<div className="columns projects-item">
                  <div className="item-wrap">
                    <a target="_blank" rel="noopener noreferrer" href={item.projectUrl}>
                      <img src={`${item.imageUrl}`} className="item-img" alt="" />
                      <div className="overlay">
                        <div className="projects-item-meta">
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
