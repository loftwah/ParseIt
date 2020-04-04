import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import './what-is-parseit-nav.css';
import Navbar from '../../navbar/navbar';

import parseWithoutCodeImg from '../../../images/what-is-parseit-parse-without-coding.png';

class WhatIsParseItNav extends Component {

    componentDidMount() {
        // Let the reducer know that a navbar item has been loaded in (this component)
        // When we return home - a progress loader will come up, and modules will load
        // And PDF/Text toggle will accurately display what is being worked on when loading is complete
        const { updateFromNavbarItem } = this.props;
        updateFromNavbarItem(true);
    }

    render() {
        return (
            <div className="what-is-parseit-nav-component">
                <Navbar />
                <div className="what-is-parseit-container">
                    <div className="container-text">
                        <div className="center parse-it-question">What is ParseIt?</div>
                        <div className="center parse-it-answer">ParseIt eliminates the need of having to write software to extract information from large amounts of PDF documents or complex text data. Anyone can create useful parsing operations fast, regardless of technical ability.</div>

                        <div className="iframe-wrapper">
                            <div className="iframe-container">
                                <iframe
                                    src='https://www.youtube.com/embed/MyCBmAK2g-Q?rel=0;&autoplay=1&mute=1'
                                    frameBorder='0'
                                    allow='autoplay; encrypted-media'
                                    allowFullScreen
                                    title='video'
                                />
                            </div>
                            <p className="center grey-text text-darken-1"> <i>All P.O. Numbers, Representative Names, Representative Emails, Shipping and Product Info are extracted from multiple invoice PDFs. The aforementioned information is then grouped together by PDF.</i></p>
                        </div>

                        <h4>Parse Your Text Without Coding</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">Instead of creating parsing software, users have the ability to funnel their PDF and text data through a custom sequence of parsing modules. All modules offer previews of how that module will manipulate a user's data.</h6></li>
                            <li><h6 className="text yellow-highlight">Using ParseIt, A non-technical business person can easily upload a large batch of similarly-structured PDF files (e.g. invoices, receipts, HR forms, analysis reports, etc.) or text, and be able to extract information quickly.</h6></li>
                        </ul>

                        <img className="medium-img" src={parseWithoutCodeImg} alt="" />
                        <p className="medium-image-caption center grey-text text-darken-1"><i>All ParseIt Modules have a "preview" option to help you visualize how that module will parse your text, before you actually use the module.</i></p>
                        <span className="image-caption-video center">
                            Video: <a href="https://www.youtube.com/watch?v=IROfLEoTVHM" target="_blank" rel="noopener noreferrer">Parsing Weather Text Without Code and With ParseIt Code</a>
                        </span>

                        <h4>One Tool For Parsing</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">All of the modules of ParseIt are abstract and versatile; allowing the user to create entirely custom parsing operations when pairing multiple modules together.</h6></li>
                        </ul>

                        <h4>Faster Than Creating Your Own Software</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">With instant results and intuitive visuals, one can parse through text faster using ParseIt than someone developing a parsing program for their one particular situation.</h6></li>
                        </ul>

                        <h4>Simple, Optional ParseIt Code</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">ParseIt offers its own optional, user-friendly coding language that represents your sequence of modules in code-form. It can be used to allow users to load in modules instantly or make quick edits.</h6></li>
                        </ul>

                        <h5>How ParseIt Code Works</h5>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">After each created module, ParseIt will deliver a line of text for that module under ParseIt Code. One line of code represents one module.</h6></li>
                            <li><h6 className="text">If a user is satisfied with how their modules parse their text, they can re-use that code in the future for similar text or PDFs.</h6></li>
                            <li><h6 className="text">When it comes time to parse again, a user can simply upload their PDFs or text, paste in their previous code and run.</h6></li>
                            <li><h6 className="text">Users can exchange codes with each other for different parsing operations, which will instantly load in all desired modules.</h6></li>
                        </ul>

                        <div className="iframe-wrapper">
                            <div className="iframe-container">
                                <iframe
                                    src='https://www.youtube.com/embed/BsRwaxLhEtY?rel=0;'
                                    frameBorder='0'
                                    allow='encrypted-media'
                                    allowFullScreen
                                    title='video'
                                />
                            </div>
                            <p className="center grey-text text-darken-1"> <i>A coworker found a way to extract one item's information (Widget D) from multiple invoice PDFs.</i></p>
                        </div>

                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        toggleFromNavbarItem: state.textRed.toggleFromNavbarItem,
    };
};

export default connect(mapStateToProps, actions)(WhatIsParseItNav);