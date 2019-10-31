import React, { Component } from "react";
import data from "./Resume.data";
import "./Resume.scss";

export default class Resume extends Component {
  render() {
    return (
      <section id="resume">
        <div className="row language">
          <div className="three columns header-col">
            <h1><span>Languages</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="bars">
              <ul className="languages">
                {data.languages && data.languages.map((item) => {
                  return (<li>
                    <span className={`bar-expand level-${item.level}`}></span>
                    <em>{item.language}</em>
                    {!!item.linkToExampleCode
                      ? <a href={item.linkToExampleCode} target="_blank" rel="noopener noreferrer"><i className="fas fa-code" /></a>
                      : undefined}
                  </li>)
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="row framework">
          <div className="three columns header-col">
            <h1><span>Frameworks</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="bars">
              <ul className="frameworks">
                {data.frameworks && data.frameworks.map((item) => {
                  return (<li>
                    <span className={`bar-expand level-${item.level}`}></span>
                    <em>{item.framework}</em>
                    {!!item.linkToExampleCode
                      ? <a href={item.linkToExampleCode} target="_blank" rel="noopener noreferrer"><i className="fas fa-code" /></a>
                      : undefined}
                  </li>)
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="row operating-system">
          <div className="three columns header-col">
            <h1><span>Operating Systems</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="bars">
              <ul className="operating-systems">
                {data["operating-systems"] && data["operating-systems"].map((item) => {
                  return (<li>
                    <span className={`bar-expand level-${item.level}`}></span>
                    <em>{item["operating-system"]}</em>
                    {!!item.linkToExampleCode
                      ? <a href={item.linkToExampleCode} target="_blank" rel="noopener noreferrer"><i className="fas fa-code" /></a>
                      : undefined}
                  </li>)
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>

          <div className="nine columns main-col">
            {data.work && data.work.map((item) => {
              return (<div className="row item">
                <div className="twelve columns">
                  <h3>{item.JobTitle}</h3>
                  <p className="info">
                    {item.Company}
                    <div>&bull; <em className="sub-info">{item.TimePeriod}</em></div>
                  </p>
                  {!!item.JobDescription
                    ? <p className="info">
                      Job description
                        <div>&bull; <em className="sub-info">{item.JobDescription}</em></div>
                    </p>
                    : undefined}
                </div>
              </div>)
            })}
          </div>
        </div>

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>

          <div className="nine columns main-col">
            {data.education && data.education.map((item) => {
              return (<div className="row item">
                <div className="twelve columns">
                  <h3>{item.CourseOfStudies}</h3>
                  <p className="info">
                    {item.University}
                    <div>&bull; <em className="sub-info">{item.TimePeriod}</em></div>
                    <div>&bull; <em className="sub-info">{item.Grade}</em></div>
                  </p>
                  {!!item.ThesisTitle
                    ? <p className="info">
                      Title of thesis
                        <div>&bull; <em className="sub-info">{item.ThesisTitle}</em></div>
                    </p>
                    : undefined}
                </div>
              </div>)
            })}
          </div>
        </div>
      </section>
    );
  }
}
