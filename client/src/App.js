import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import ParseItContainer from './components/parseit-container/parseit-container';
import WhatIsParseItNav from './components/navbar-components/what-is-parseit-nav/what-is-parseit-nav';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path='/' component={ParseItContainer} />
					<Route path='/what-is-parseit' component={WhatIsParseItNav} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
