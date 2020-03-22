import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import './what-is-parseit-nav.css';
import Navbar from '../../navbar/navbar';

class WhatIsParseItNav extends Component {

    componentDidMount() {
        // Let the reducer know that a navbar item has been loaded in (this component)
        // When we return home - a progress loader will come up, and modules will load
        // And PDF/Text toggle will accurately display what is being worked on when loading is complete
        const { updateFromNavbarItem } = this.props;
        updateFromNavbarItem(true);
    }

    render() {
        console.log('ParseItNav has rendered')
        return (
            <div className="what-is-parseit-nav-component">
                <Navbar />
                <div className="what-is-parseit-container">
                    <div className="container-text">
                        <h1 className="center parse-it-question">What is ParseIt?</h1>
                        <h5 className="center parse-it-answer">ParseIt automates the process of extracting valuable information from large amounts of PDF documents or complex text data, and combining that information together.</h5>

                        <h4>Parse Your Text Without Coding</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">ParseIt eliminates the need to write software to extract information from text data.</h6></li>
                            <li><h6 className="text">A non-technical business person can easily upload a large batch of similarly-structured PDF files (e.g. invoices, receipts, HR forms, analysis reports, etc.) or text, and be able to extract information quickly.</h6></li>
                        </ul>

                        <h4>One Tool For Parsing</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">All of the modules of ParseIt are abstract and versatile; allowing the user to create entirely custom parsing operations when pairing multiple modules together.</h6></li>
                        </ul>

                        <h4>Faster Than Creating Your Own Software</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">With instant results and intuitive visuals, one can parse through text faster using ParseIt than someone developing a parsing program for their one particular situation.</h6></li>
                        </ul>

                        <h4>Simple, Intuitive ParseIt Code</h4>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">ParseIt offers its own optional, user-friendly coding language to allow users to work incredibly fast.</h6></li>
                        </ul>

                        <h5>How ParseIt Code Works</h5>

                        <ul className="browser-default what-is-parse-it-list">
                            <li><h6 className="text">After each created module, ParseIt will deliver a line of text for that module under ParseIt Code. One line of code represents one module.</h6></li>
                            <li><h6 className="text">If a user is satisfied with how their modules parse their text, they can re-use that code in the future for similar text or PDFs.</h6></li>
                            <li><h6 className="text">When it comes time to parse again, a user can simply upload their PDFs or text, paste in their previous code and run.</h6></li>
                            <li><h6 className="text">Users can exchange codes with each other for different parsing operations, which will instantly load in all desired modules.</h6></li>
                        </ul>

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