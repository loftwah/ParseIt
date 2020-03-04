import React, { Component } from 'react';
import M from 'materialize-css';

import './navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: '',
        };
    }

    componentDidMount() {
        let elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }

    render() {
        return (
            <div className="my-component">
                <nav>
                    <div className="nav-wrapper blue darken-3">
                        <a href="#" className="brand-logo"><b>ParseIt</b></a>
                        <a href="#" data-target="slide-out" className="sidenav-trigger right">
                            <i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#!">What is ParseIt?</a></li>
                            <li><a href="#!">Tutorial</a></li>
                            <li><a href="#!">ParseIt Code</a></li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">

                    <li><a href="#!" className="waves-effect">What is ParseIt?</a></li>
                    <li><a href="#!" className="waves-effect">Tutorial</a></li>
                    <li><a className="waves-effect" href="#!">ParseIt Code</a></li>
                </ul>
            </div>
        );
    };
};

export default Navbar;