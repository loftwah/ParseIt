import React, { Component } from 'react';
import M from 'materialize-css';
import { Link, NavLink } from 'react-router-dom'

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
                        <Link className="brand-logo" to="/"><b>ParseIt</b></Link>
                        <a href="/" data-target="slide-out" className="sidenav-trigger right">
                            <i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li> <NavLink to='/what-is-parseit'><b>What is ParseIt?</b></NavLink> </li>
                            <li> <NavLink to='/tutorial'><b>Tutorial</b></NavLink></li>
                            <li> <NavLink to='/examples'><b>Examples</b></NavLink></li>
                            <li> <NavLink to='/'><b>Tricks</b></NavLink></li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li><NavLink to='/what-is-parseit'>What is ParseIt?</NavLink> </li>
                    <li><NavLink to='/tutorial'>Tutorial</NavLink></li>
                    <li><NavLink to='/examples'>Examples</NavLink></li>
                    <li><NavLink to='/'>Tricks</NavLink></li>
                </ul>
            </div>
        );
    };
};

export default Navbar;