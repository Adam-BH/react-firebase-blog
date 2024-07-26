import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Authentification } from './pages/Authentification';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={<Authentification />} />
					<Route path="/home" element={<Home />} />
					<Route path="*" element={<Navigate to="/auth" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
