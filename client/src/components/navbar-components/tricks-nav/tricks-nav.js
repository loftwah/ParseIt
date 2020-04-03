import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import './tricks-nav.css';
import Navbar from '../../navbar/navbar';

class TricksNav extends Component {

    componentDidMount() {
        // Let the reducer know that a navbar item has been loaded in (this component)
        // When we return home - a progress loader will come up, and modules will load
        // And PDF/Text toggle will accurately display what is being worked on when loading is complete
        const { updateFromNavbarItem } = this.props;
        updateFromNavbarItem(true);
    }

    render() {
        return (
            <div className="tricks-nav-component">
                <Navbar />
                <div className="tricks-container">
                    <div className="container-text">
                        <div className="center tricks-header">Tricks</div>

                        <h4>Tips and Tricks for ParseIt Modules</h4>

                        <ol className="browser-default tricks-list">
                            <h6 className="text"><li>To delete all instances of a phrase, use the "Replace Characters" module.</li></h6>

                            <ul class="browser-default tricks-list circle">
                                <h6 className="text"><li>Set the "replace characters" input to the phrase you would like to delete, and leave the "inserted characters" input blank.</li></h6>
                                <h6 className="text"><li>If the chracters you want to delete happen to be an entire line, that whole line will be deleted.</li></h6>
                            </ul>

                            <h6 className="text"><li>Instead of trying to parse information in one shot, consider parsing text in "chunks" using the "Save Text" module.</li></h6>

                            <ul class="browser-default tricks-list circle">
                                <h6 className="text"><li>This module will save that "chunk" of data you are working on, and return you the original data to create more "chunks" if you wish.</li></h6>
                                <h6 className="text"><li>Under the Display Saved Text buttons, ParseIt offers a display that combines these "chunks" of data.</li></h6>
                            </ul>

                            <h6 className="text"><li>In the begining of your parsing operations, you will typically want to use the Delete Modules to delete large portions of text.</li></h6>

                            <ul class="browser-default tricks-list circle">
                                <h6 className="text"><li>For the modules "Delete Beginning Until Set of Characters" and "Delete Last Set of Characters until End", if the set of characters is not found, that input will have no changes - use this to your advantage.</li></h6>
                                <h6 className="text"><li>Use "Delete Specified Lines" module sparingly, if the length of your PDF or text varies, you may want to use another module.</li></h6>
                            </ul>

                            <h6 className="text"><li>Splitting lines using a phrase that contains a space on one or both ends.</li></h6>

                            <ul class="browser-default tricks-list circle">
                                <h6 className="text"><li>The Split Line Modules will not accept spaces before or after a phrase. As a workaround, use the "Replace Characters" module to modify your phrase into an acceptable input. After splitting, turn your phrase back to the original phrase using the "Replace Characters" module again.</li></h6>
                                <h6 className="text"><li>Example: If we want to split on "<b> hello </b>", consider replacing all "<b> hello </b>" with "<b>{' <UNIQUE_BEGIN> hello <UNIQUE_END> '}</b>" (spaces at the ends), using the "Replace Characters" Module. These "<b>{'<UNIQUE>'}</b>" phrases are text that will never appear inside your data. The following phrase, "<b>{'<UNIQUE_BEGIN> hello <UNIQUE_END>'}</b>" (no spaces at the ends), is an acceptable input to split. When complete, remove every instance of "<b>{'<UNIQUE_BEGIN>'}</b>" and "<b>{'<UNIQUE_END>'}</b>"</li></h6>
                            </ul>
                        </ol>

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

export default connect(mapStateToProps, actions)(TricksNav);