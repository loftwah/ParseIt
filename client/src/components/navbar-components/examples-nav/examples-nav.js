import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

import * as actions from '../../../actions';
import './examples-nav.css';
import Navbar from '../../navbar/navbar';

class ExamplesNav extends Component {

    componentDidMount() {
        // Let the reducer know that a navbar item has been loaded in (this component)
        // When we return home - a progress loader will come up, and modules will load
        // And PDF/Text toggle will accurately display what is being worked on when loading is complete
        const { updateFromNavbarItem } = this.props;
        updateFromNavbarItem(true);
        let examplesCollapsible = document.querySelectorAll('.examples-collapsible');
        M.Collapsible.init(examplesCollapsible);
    }

    render() {
        return (
            <div className="examples-nav-component">
                <Navbar />
                <div className="examples-container">
                    <div className="container-text">
                        <div className="center examples-header">Examples</div>

                        <ul class="collapsible examples-collapsible">
                            <li>
                                <div class="collapsible-header"><i class="material-icons">chat</i>Create a YouTube Transcript</div>
                                <div class="collapsible-body">

                                    <div className="iframe-wrapper">
                                        <div className="iframe-container">
                                            <iframe
                                                src='https://www.youtube.com/embed/9i4bUjGg9ys?rel=0;'
                                                frameBorder='0'
                                                allow='encrypted-media'
                                                allowFullScreen
                                                title='video'
                                            />
                                        </div>
                                        <p className="center grey-text text-darken-1"> <i>Video Example: Create a YouTube Transcript</i></p>
                                    </div>

                                    <h5>Remove Timestamps and Concatenate </h5>
                                    <div className="example-code-text">
                                        <p>MultipleDeleteLine "(1)" "(2)"</p>
                                        <p>Concatenate</p>
                                    </div>
                                    <h5>Time and Text on One Line</h5>

                                    <div className="example-code-text">
                                        <p>MultipleAddTextToBeginning "(1)" "(2)" "(TIME: )"</p>
                                        <p>Concatenate</p>
                                        <p>SplitLinesBeforeWord "(TIME:)"</p>
                                        <p>ReplaceCharacters "(TIME: )" "()"</p>
                                    </div>

                                </div>
                            </li>
                            <li>
                                <div class="collapsible-header"><i class="material-icons">filter_drama</i>Extract Weather From weather.gov HTML</div>
                                <div class="collapsible-body">

                                    <div className="iframe-wrapper">
                                        <div className="iframe-container">
                                            <iframe
                                                src='https://www.youtube.com/embed/fVsDxFqaKHk?rel=0;'
                                                frameBorder='0'
                                                allow='encrypted-media'
                                                allowFullScreen
                                                title='video'
                                            />
                                        </div>
                                        <p className="center grey-text text-darken-1"> <i>Video Example: Extract Weather From weather.gov HTML</i></p>
                                    </div>

                                    <p className="website-link">
                                        <span>Website: <a href="https://www.weather.gov/" target="_blank" rel="noopener noreferrer">weather.gov</a></span>
                                    </p>

                                    <div className="example-code-text">
                                        <p>DeleteBeginningUntilPhrase "({'<b>'}Extended Forecast for{'</b>'})"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>ReplaceCharacters "({"\u0009"})" "()"</p>
                                        <p>DeleteLastPhraseUntilEnd "({'<div class="panel-body" id="seven-day-forecast-body">'})"</p>
                                        <p>DeleteBeginningUntilPhrase "(  )"</p>
                                        <p>DeleteLastPhraseUntilEnd "({'</h2'}>)"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>MultipleAddTextToBeginning "(1)" "(1)" "(Location: )"</p>
                                        <p>CreateLineBeginningAllInputs "()"</p>
                                        <p>CreateLineBeginningFirstInput "(Some Forecasts from HTML)"</p>
                                        <p>SaveText "(Location)"</p>
                                        <p>DeleteBeginningUntilPhrase "({'<div class="tombstone-container">'})"</p>
                                        <p>DeleteLastPhraseUntilEnd "(// equalize forecast heights)"</p>
                                        <p>ReplaceCharacters "({'<div class="tombstone-container">'})" "()"</p>
                                        <p>ReplaceCharacters "({'<p class="period-name">'})" "()"</p>
                                        <p>ReplaceCharacters "({'<script type="text/javascript">'})" "()"</p>
                                        <p>MultipleAddTextToBeginning "(1)" "(2)" "(Date: )"</p>
                                        <p>ReplaceCharacters "({'<br>'})" "( )"</p>
                                        <p>ReplaceCharacters "({'</p>'})" "( {'</p>'})"</p>
                                        <p>MultipleSplitLinesBeforeWord "(1)" "(2)" "({'</p'})" "(backward)" "(1)"</p>
                                        <p>MultipleDeleteLine "(2)" "(3)"</p>
                                        <p>MultipleSplitLinesAfterWord "(2)" "(2)" "(:)" "(forward)" "(1)"</p>
                                        <p>MultipleDeleteLine "(2)" "(3)"</p>
                                        <p>MultipleSplitLinesBeforeWord "(2)" "(2)" "(title=)" "(forward)" "(1)"</p>
                                        <p>MultipleDeleteLine "(3)" "(3)"</p>
                                        <p>ReplaceCharacters "(")" "()"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>MultipleAddTextToBeginning "(2)" "(2)" "(Forecast: )"</p>
                                        <p>SaveText "(Forecast)"</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="collapsible-header"><i class="material-icons">assignment</i>Extract Invoice Information From "Tutorial" Invoice PDFs</div>
                                <div class="collapsible-body">

                                    <div className="iframe-wrapper">
                                        <div className="iframe-container">
                                            <iframe
                                                src='https://www.youtube.com/embed/SY1ERK1HMOo?rel=0;'
                                                frameBorder='0'
                                                allow='encrypted-media'
                                                allowFullScreen
                                                title='video'
                                            />
                                        </div>
                                        <p className="center grey-text text-darken-1"> <i>Video Example: Extract Invoice Information From "Tutorial" Invoice PDFs</i></p>
                                    </div>

                                    <p className="website-link">
                                        <span>Tutorial PDFs: <a href="https://github.com/MikeM711/ParseIt/tree/master/demo/tutorial-invoices" target="_blank" rel="noopener noreferrer">GitHub</a></span>
                                    </p>

                                    <div className="example-code-text">
                                        <p>Concatenate</p>
                                        <p>DeleteBeginningUntilPhrase "(P.O.)"</p>
                                        <p>DeleteLastPhraseUntilEnd "(Invoice Number)"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>CreateLineBeginningAllInputs "()"</p>
                                        <p>CreateLineBeginningAllInputs "($$GetName$$)"</p>
                                        <p>CreateLineBeginningAllInputs "()"</p>
                                        <p>CreateLineBeginningFirstInput "(Parsed Invoice Data)"</p>
                                        <p>SaveText "(PO Number)"</p>
                                        <p>Concatenate</p>
                                        <p>ReplaceCharacters "(   )" "( {'<LARGE SPACES>'} )"</p>
                                        <p>SplitLinesBeforeWord "({'<LARGE SPACES>'})"</p>
                                        <p>DeleteBeginningUntilPhrase "(Thank you for your business)"</p>
                                        <p>DeleteLastPhraseUntilEnd "(!)"</p>
                                        <p>SplitLinesAfterWord "(PARSEIT COMPANY)"</p>
                                        <p>DeleteLineIfHasPhrase "({'<LARGE SPACES>'})"</p>
                                        <p>SplitLinesAfterWord "(Sincerely yours,)"</p>
                                        <p>DeleteLineIfHasPhrase "(Sincerely yours,)"</p>
                                        <p>ReplaceCharacters "(INVOICE  )" "(INVOICE)"</p>
                                        <p>MultipleSplitLinesAfterWord "(1)" "(1)" "(  )" "(forward)" "(1)"</p>
                                        <p>DeleteLineIfHasPhrase "(Description Quantity Unit Price)"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>MultipleAddTextToBeginning "(1)" "(1)" "(ParseIt Representative: )"</p>
                                        <p>SaveText "(Representative Name)"</p>
                                        <p>Concatenate</p>
                                        <p>SplitLinesBeforeWord "(@parseit.com)"</p>
                                        <p>SplitLinesAfterWord "(@parseit.com)"</p>
                                        <p>DeleteLineIfDoesntHavePhrase "(@parseit.com)"</p>
                                        <p>MultipleAddTextToBeginning "(1)" "(1)" "(ParseIt Representative Email: )"</p>
                                        <p>SaveText "(Representative Email)"</p>
                                        <p>Concatenate</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>ReplaceCharacters "(	)" "( )"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>DeleteBeginningUntilPhrase "(Ship To:)"</p>
                                        <p>DeleteLastPhraseUntilEnd "(Date:)"</p>
                                        <p>SaveText "(Shipping)"</p>
                                        <p>DeleteBeginningUntilPhrase "(Invoice Number:)"</p>
                                        <p>DeleteBeginningUntilPhrase "(Cost)"</p>
                                        <p>ReplaceCharacters "(Cost)" "()"</p>
                                        <p>Concatenate</p>
                                        <p>ReplaceCharacters "(   )" "( {'<LARGE SPACES>'} )"</p>
                                        <p>SplitLinesBeforeWord "({'<LARGE SPACES>'})"</p>
                                        <p>DeleteLastPhraseUntilEnd "(Subtotal)"</p>
                                        <p>ReplaceCharacters "(! )" "(!)"</p>
                                        <p>SplitLinesBeforeWord "(!)"</p>
                                        <p>SplitLinesAfterWord "(!)"</p>
                                        <p>DeleteLineIfHasPhrase "(!)"</p>
                                        <p>MultipleSplitLinesAfterWord "(1)" "(1)" "(  )" "(backward)" "(1)"</p>
                                        <p>DeleteBetweenPhrases "(INVOICE)" "(PARSEIT COMPANY)"</p>
                                        <p>ReplaceCharacters "(PARSEIT COMPANY )" "()"</p>
                                        <p>ReplaceCharacters "(INVOICE)" "()"</p>
                                        <p>DeleteBetweenPhrases "(Sincerely yours,)" "({'<LARGE SPACES>'})"</p>
                                        <p>DeleteLineIfHasPhrase "(Thank you for your business.)"</p>
                                        <p>ReplaceCharacters "({'<LARGE SPACES>'})" "()"</p>
                                        <p>ReplaceCharacters "(Description Quantity Unit Price)" "()"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>ReplaceCharacters "({'\t'})" "( )"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>DeleteBeginningUntilPhrase "(Cost)"</p>
                                        <p>ReplaceCharacters "(Cost )" "()"</p>
                                        <p>DeleteLastPhraseUntilEnd "(Subtotal)"</p>
                                        <p>ReplaceCharacters "($ )" "($)"</p>
                                        <p>ReplaceCharacters "( - )" "(-)"</p>
                                        <p>SplitLinesBeforeWord "(.)"</p>
                                        <p>SplitLinesAfterWord "($)"</p>
                                        <p>RemoveBlankLines</p>
                                        <p>DeleteLineIfHasPhrase "(!)"</p>
                                        <p>MultipleSplitLinesBeforeWord "(1)" "(1)" "( )" "(backward)" "(1)"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>MultipleAddTextToBeginning "(1)" "(4)" "(Product: )"</p>
                                        <p>MultipleAddTextToBeginning "(2)" "(4)" "(Quantity: )"</p>
                                        <p>MultipleAddTextToBeginning "(3)" "(4)" "(Unit Price: )"</p>
                                        <p>MultipleAddTextToBeginning "(4)" "(4)" "(Cost: )"</p>
                                        <p>ReplaceCharacters "(Description Quantity)" "()"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>SaveText "(Production)"</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="collapsible-header"><i class="material-icons">whatshot</i>Extract COVID-19 U.S. "Confirmed Cases" Data From World Health Organization PDFs</div>
                                <div class="collapsible-body">

                                <div className="iframe-wrapper">
                                        <div className="iframe-container">
                                            <iframe
                                                src='https://www.youtube.com/embed/NJXDQWLnO2E?rel=0;'
                                                frameBorder='0'
                                                allow='encrypted-media'
                                                allowFullScreen
                                                title='video'
                                            />
                                        </div>
                                        <p className="center grey-text text-darken-1"> <i>Video Example: Extract COVID-19 U.S. "Confirmed Cases" Data From World Health Organization PDFs</i></p>
                                    </div>

                                    <p className="website-link">
                                        <span>John Hopkins GitHub repo of WHO Situation Report PDFs: <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" rel="noopener noreferrer">COVID-19</a></span>
                                    </p>

                                    <div className="example-code-text">

                                        <p>DeleteBeginningUntilPhrase "(Data as reported)"</p>
                                        <p>Concatenate</p>
                                        <p>ReplaceCharacters "(*)" "( * )"</p>
                                        <p>SplitLinesBeforeWord "(*)"</p>
                                        <p>DeleteLineIfHasPhrase "(*)"</p>
                                        <p>SplitLinesBeforeWord "(Coronavirus disease)"</p>
                                        <p>DeleteLineIfHasPhrase "(Coronavirus disease)"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>SplitLinesBeforeWord "(SUMMARY)"</p>
                                        <p>DeleteLineIfHasPhrase "(SUMMARY)"</p>
                                        <p>SplitLinesAfterWord "(2020)"</p>
                                        <p>DeleteLineIfDoesntHavePhrase "(2020)"</p>
                                        <p>SaveText "(date)"</p>
                                        <p>Concatenate</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>ReplaceCharacters "(Uni ted)" "(United)"</p>
                                        <p>ReplaceCharacters "(C anada)" "(Canada)"</p>
                                        <p>DeleteBeginningUntilPhrase "(SURVEILLANCE)"</p>
                                        <p>DeleteBeginningUntilPhrase "(United States)"</p>
                                        <p>SplitLinesBeforeWord "(Canada)"</p>
                                        <p>DeleteLineIfHasPhrase "(Canada)"</p>
                                        <p>SplitLinesBeforeWord "(Local)"</p>
                                        <p>DeleteLineIfHasPhrase "(Local)"</p>
                                        <p>MultipleAddTextToBeginning "(1)" "(1)" "({'<CONFIRMED_CASES>'})"</p>
                                        <p>DeleteLineIfDoesntHavePhrase "(United)"</p>
                                        <p>SplitLinesBeforeWord "(Total Confirmed)"</p>
                                        <p>DeleteLineIfHasPhrase "(Total Confirmed)"</p>
                                        <p>ReplaceCharacters "(United)" "()"</p>
                                        <p>ReplaceCharacters "(States)" "()"</p>
                                        <p>ReplaceCharacters "(of)" "()"</p>
                                        <p>ReplaceCharacters "(America)" "()"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>ReplaceCharacters "({'<CONFIRMED_CASES>'})" "(Confirmed Cases:)"</p>
                                        <p>MultipleSplitLinesAfterWord "(1)" "(1)" "( )" "(forward)" "(3)"</p>
                                        <p>DeleteLineIfDoesntHavePhrase "(Confirmed Cases)"</p>
                                        <p>RemoveExcessSpaces</p>
                                        <p>SaveText "(view US confirmed covid-19 cases)"</p>
                                    </div>

                                </div>
                            </li>
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

export default connect(mapStateToProps, actions)(ExamplesNav);