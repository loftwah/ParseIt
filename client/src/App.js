import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import ParseItContainer from './components/parseit-container/parseit-container';
import WhatIsParseItNav from './components/navbar-components/what-is-parseit-nav/what-is-parseit-nav';
import TutorialNav from './components/navbar-components/tutorial-nav/tutorial-nav';
import ExamplesNav from './components/navbar-components/examples-nav/examples-nav';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path='/' component={ParseItContainer} />
					<Route path='/what-is-parseit' component={WhatIsParseItNav} />
					<Route path='/tutorial' component={TutorialNav} />
					<Route path='/examples' component={ExamplesNav} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
