import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import './tutorial-nav.css';
import Navbar from '../../navbar/navbar';

class TutorialNav extends Component {

    componentDidMount() {
        // Let the reducer know that a navbar item has been loaded in (this component)
        // When we return home - a progress loader will come up, and modules will load
        // And PDF/Text toggle will accurately display what is being worked on when loading is complete
        const { updateFromNavbarItem } = this.props;
        updateFromNavbarItem(true);
    }

    render() {
        return (
            <div className="tutorial-nav-component">
                <Navbar />
                <div className="tutorial-container">
                    <div className="container-text">
                        <div className="center tutorial-header">Tutorial</div>

                        <h4>ParseIt Overview: Stacking Modules</h4>

                        <h6 className="text">ParseIt comes with 21 simple, open-ended modules that can either add, remove, replace, split or save text. <span className="yellow-highlight">The purpose of ParseIt is to "stack" these modules on top of each other, and have your input funneled through each module.</span> The parsing operation starts at the top module and ends at the bottom module. It is up to the user to choose the modules, module sequence and module inputs to form a solution.</h6>

                        <h6 className="text">As you are manually creating modules, ParseIt automatically generates ParseIt Code of your module sequence in code-form. If you were working from scratch, this code is what you would use to load in all modules you are currently working with.</h6>


                        <h4>Workflow: Plain Text</h4>

                        <ol className="browser-default tutorial-list">
                            <h6 className="text"><li>Choose a number of textboxes and write some text, or click the "Dummy Text" button for text to parse.</li></h6>
                            <h6 className="text"><li>Click the "Parse The Above Text" button when you are ready to start parsing. The app will load blank ParseIt Code, ParseIt Module buttons and a display of your inputs.</li></h6>
                            <h6 className="text"><li>Start using modules to parse your text. Each module will have a "preview" to view your changes, and a "submit" button to add that module to your workflow.</li></h6>
                            <h6 className="text"><li> If you want to make modifications to your input text - make the modifications and click the "Parse The Above Text" button again. This button will fire up your current modules.</li></h6>
                        </ol>

                        <h4>Workflow: PDF</h4>

                        <ol className="browser-default tutorial-list">
                            <h6 className="text"><li>Browse for a single PDF or multiple PDF files.</li></h6>
                            <h6 className="text"><li>Click the "Upload Selected PDF Files" button when you are ready to start parsing.</li></h6>
                            <h6 className="text"><li>From here, the workflow is exactly like the Plain Text workflow.</li></h6>
                        </ol>

                        <h4>Previews</h4>

                        <ul className="browser-default tutorial-list">
                            <h6 className="text"><li>Green Text: Text that will be added to the result.</li></h6>

                            <div className="preview-additions-text-box"
                                style={{ fontFamily: 'Courier' }}>
                                <div className="preview-additions-text">
                                    <div className="line">
                                        <span className="line-number">[1]&#160;</span>
                                        <span>Some text&#160;</span>
                                        <span style={{ background: "rgb(74, 255, 83)" }}><b>Added Text</b></span>
                                        <span className="line-text">&#160;Some text&#160;</span>
                                    </div>
                                </div>
                            </div>


                            <h6 className="text"><li>Red Text: Text that will be deleted from the result.</li></h6>

                            <div className="preview-deletions-text-box"
                                style={{ fontFamily: 'Courier' }}>
                                <div className="preview-deletions-text">
                                    <div className="line">
                                        <span className="line-number">[1]&#160;</span>
                                        <span>Text to keep&#160;</span>
                                        <span style={{ background: "red" }}><b>Deleted Text</b></span>
                                        <span className="line-text">&#160;Text to keep&#160;</span>
                                    </div>
                                </div>
                            </div>

                            <h6 className="text"><li>Orange Text: Line segments that will be moved.</li></h6>

                            <ul class="browser-default tutorial-list circle">
                                <h6 className="text"><li> <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span> - Line segment will be split to the next line.</li></h6>

                                <div className="preview-additions-text-box"
                                    style={{ fontFamily: 'Courier' }}>
                                    <div className="preview-additions-text">
                                        <div className="line">
                                            <span className="line-number">[1]&#160;</span>
                                            <span>Some text&#160;</span>
                                            <span className="line-text" style={{ background: "lightblue" }}>&#8628;</span>
                                            <span style={{ background: "orange" }}>This segment will be moved to the next line</span>
                                        </div>
                                    </div>
                                </div>

                                <h6 className="text">
                                    <li> <span className="line-text" style={{ background: "lightblue" }}>⤻</span> - Line segment will be merged to the line above.</li></h6>

                                <div className="preview-additions-text-box"
                                    style={{ fontFamily: 'Courier' }}>
                                    <div className="preview-additions-text">
                                        <div className="line">
                                            <p>
                                                <span className="line-number">[1]&#160;</span>
                                                <span>Some text</span>
                                            </p>
                                            <p>
                                                <span className="line-number">[2]&#160;</span>
                                                <span className="line-text" style={{ background: "lightblue" }}>⤻</span>
                                                <span style={{ background: "orange" }}>This segment will be moved to the line above</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ul>

                            <h6 className="text"><li>Yellow Index Number: A line that is under consideration by a Multi-Line module.</li></h6>

                            <div className="preview-additions-text-box"
                                style={{ fontFamily: 'Courier' }}>
                                <div className="preview-additions-text">
                                    <div className="line">
                                        <p>
                                            <span className="line-number" style={{ background: "yellow" }}>[1]&#160;</span>
                                            <span>This line can be affected if it satisfies a condition</span>
                                        </p>
                                        <p>
                                            <span className="line-number">[2]&#160;</span>
                                            <span>This line will never be affected</span>
                                        </p>
                                        <p>
                                            <span className="line-number" style={{ background: "yellow" }}>[3]&#160;</span>
                                            <span>This line can be affected if it satisfies a condition</span>
                                        </p>
                                        <p>
                                            <span className="line-number">[4]&#160;</span>
                                            <span>This line will never be affected</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </ul>

                        <h4>ParseIt Code - General Information</h4>

                        <h6 className="text preface" >Remember: ParseIt Code is entirely optional. ParseIt will generate ParseIt Code for you while you are manually creating modules. When satisfied, you may use that generated ParseIt Code for parsing similar text again.</h6>

                        <ul className="browser-default tutorial-list">

                            <h6 className="text"><li>Each line of ParseIt Code represents one module.</li></h6>
                            <h6 className="text"><li>ParseIt Code will ignore empty lines.</li></h6>

                            <h6 className="text"><li>All modules use the following structure: ParseItModule "(parameter #1)" "(parameter #2)" ...</li></h6>
                            <h6 className="text"><li>Parameters: "()" represents an empty module parameter.</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 className="text"><li> Example: "(hello)" is an example of a filled parameter, where <b>hello</b> is a phrase being passed into the module.</li></h6>
                            </ul>
                            <h6 className="text"><li>Because "()" is the structure of a parameter, no modules will accept <b>)" "(</b> as a parameter.</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 className="text"><li>To reiterate, no modules will accept the five-character sequence, <b>closing parenthesis, double quotes, single space, double quotes, open parenthesis</b>, at any location within a phrase. Any other sequence of characters is acceptable.</li></h6>
                                <h6 className="text"><li>If the parameter, <b>)" "(</b> , is needed for a module, you can get the result you want by using a few extra modules.</li></h6>
                            </ul>

                        </ul>

                        <h4>ParseIt Code - Module Code</h4>

                        <h6 className="text preface" >A cheat sheet for all module codes and parameter limitations. </h6>

                        <ul className="browser-default tutorial-list">

                            <h6 className="text"><li>ReplaceCharacters "(replace characters)" "(insert characters)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>replace characters: any text</li></h6>
                                <h6 ><li>insert characters: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>DeleteBeginningUntilPhrase "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>DeleteLastPhraseUntilEnd "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>DeleteCertainLines "(number range)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>number range: intervals or singular numbers separated by commas, e.g. 1-5, 8, 11-13</li></h6>
                            </ul>

                            <h6 className="text"><li>DeleteBetweenPhrases "(phrase)" "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>DeleteLineIfHasPhrase "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>DeleteLineIfDoesntHavePhrase "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>CreateLineBeginningAllInputs "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                                <h6 ><li>Using the parameter, <b>$$GetName$$</b>, will give you the name of the input</li></h6>
                            </ul>

                            <h6 className="text"><li>CreateLineBeginningFirstInput "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>


                            <h6 className="text"><li>CreateLineEndAllInputs "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>CreateLineEndLastInput "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>MultipleSplitLinesBeforeWord "(number: line begin)" "(number: line multiple)" "(phrase)" "(direction: forward/backward)" "(number: instance)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>line begin: a number</li></h6>
                                <h6 ><li>line multiple: a number</li></h6>
                                <h6 ><li>phrase: any text</li></h6>
                                <h6 ><li>direction: <b>forward</b> or <b>backward</b> are the only acceptable parameters</li></h6>
                                <h6 ><li>instance: a number</li></h6>
                            </ul>

                            <h6 className="text"><li>MultipleSplitLinesAfterWord "(number: line begin)" "(number: line multiple)" "(phrase)" "(direction: forward/backward)" "(number: instance)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>line begin: a number</li></h6>
                                <h6 ><li>line multiple: a number</li></h6>
                                <h6 ><li>phrase: any text</li></h6>
                                <h6 ><li>direction: <b>forward</b> or <b>backward</b> are the only acceptable parameters</li></h6>
                                <h6 ><li>instance: a number</li></h6>
                            </ul>

                            <h6 className="text"><li>MultipleAddTextToBeginning "(number: line begin)" "(number: line multiple)" "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>line begin: a number</li></h6>
                                <h6 ><li>line multiple: a number</li></h6>
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                            <h6 className="text"><li>MultipleDeleteLine "(number: line begin)" "(number: line multiple)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>line begin: a number</li></h6>
                                <h6 ><li>line multiple: a number</li></h6>
                            </ul>

                            <h6 className="text"><li>SplitLinesBeforeWord "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text, cannot have spaces at the beginning or end of the phrase</li></h6>
                            </ul>

                            <h6 className="text"><li>SplitLinesAfterWord "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text, cannot have spaces at the beginning or end of the phrase</li></h6>
                            </ul>

                            <h6 className="text"><li>Concatenate</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>no parameters</li></h6>
                            </ul>

                            <h6 className="text"><li>RemoveBlankLines</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>no parameters</li></h6>
                            </ul>

                            <h6 className="text"><li>RemoveExcessSpaces</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>no parameters</li></h6>
                            </ul>

                            <h6 className="text"><li>SaveText "(phrase)"</li></h6>
                            <ul class="browser-default tutorial-list circle">
                                <h6 ><li>phrase: any text</li></h6>
                            </ul>

                        </ul>

                        <h4>Creating Strong Reusable Code</h4>
                        <h6 className="text preface" >The goal for ParseIt is not to generate code that works for only one input of data, but code that works for <u>all</u> similarly-structured text.</h6>

                        <h6 className="text preface" >Below are some ways to keep your ParseIt modules and code robust.</h6>

                        <ol className="browser-default tutorial-list">
                            <h6 className="text"><li>The more PDF files or number of input text you upload, the better.</li></h6>
                            <ul class="browser-default tutorial-list circle spaced-circle">
                                <h6 ><li>If you want to create reusable ParseIt code for the future, start by uploading many files/text. Uploading a lot of data will give you an idea on how the data differs between each other; knowing this will help you find a reusable solution for extracting the information you need.</li></h6>
                            </ul>
                            <h6 className="text"><li>Watch out for references to data that may change.</li></h6>

                            <ul class="browser-default tutorial-list circle spaced-circle">
                                <h6 ><li>Tying into #1, keep in mind about data that fluctuates.</li></h6>
                                <h6 ><li>Questions to ask yourself: Does your code/modules account for varying lengths? Is the salesman always "John Doe"? Can an item be three words instead of one? </li></h6>
                            </ul>

                            <h6 className="text"><li> The "Save Text" module is your friend.</li></h6>

                            <ul class="browser-default tutorial-list circle spaced-circle">
                                <h6 ><li>If you are having difficulty extracting the text you want, consider extracting the text in "chunks" using the Save Text module.</li></h6>
                                <h6 ><li>The Save Text module allows you to save each "chunk" of data, and returns you the original data to create more "chunks" if you wish. Under the "Display Saved Text" buttons, ParseIt offers a display that combines these "chunks" of data.</li></h6>
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

export default connect(mapStateToProps, actions)(TutorialNav);