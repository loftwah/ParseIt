import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ParseItContainer from './components/parseit-container/parseit-container';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path='/' component={ParseItContainer} />
			</div>
		</BrowserRouter>
	);
}

export default App;
