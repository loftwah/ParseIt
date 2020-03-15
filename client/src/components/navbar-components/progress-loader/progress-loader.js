import React, { Component } from 'react';

import './progress-loader.css';

class ProgressLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="progress-loader-component">
                <div className="parseit-home-in-progress">
                    <div className="progress-dark-background"></div>
                    <div className="overlay-progress-text">
                        <div className="nav-progress-circle">
                            <div className="preloader-wrapper active ">
                                <div className="spinner-layer spinner-blue-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div><div className="gap-patch">
                                        <div className="circle"></div>
                                    </div><div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nav-progress-text">
                            <p className="center">Loading Text and Modules</p>
                            <p className="center">Please wait...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default ProgressLoader;