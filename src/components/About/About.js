import React, { Component } from "react";
import data from "./About.data";
import "./About.scss";

export default class About extends Component {
   render() {
      return (
         <section id="about" className="about-background">
            <div className="row">
               <div className="three columns">
                  <img className="profile-pic" src="images/profile.jpg" alt="Profile" />
               </div>
               <div className="nine columns main-col">
                  <h2 className="about-header">About Me</h2>
                  <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
                  <div className="row">
                     <div className="six columns contact-details">
                        <h2 className="about-header">Contact Details</h2>
                        <p className="contact">
                           <span>{data.name}</span>
                           {data.contacts && data.contacts.map((item) => {
                              return (<>
                                 <br></br>
                                 <span>
                                    <i className={item.icon} />
                                    <a className="about-link" target="_blank" rel="noopener noreferrer" href={item.link}>
                                       {item.title}
                                    </a>
                                 </span>
                              </>)
                           })}
                        </p>
                     </div>
                     <div className="six columns curriculum-vitae">
                        <h2 className="about-header">Curriculum vitae</h2>
                        <span className="about-resume-download">
                           <i className="fas fa-file-download" />
                           <a className="about-link" target="_blank" rel="noopener noreferrer" href="/docs/CV_EN.pdf">CV english</a>
                        </span>
                        <span className="about-resume-download">
                           <i className="fas fa-file-download" />
                           <a className="about-link" target="_blank" rel="noopener noreferrer" href="/docs/CV_DE.pdf">CV german</a>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }
}
