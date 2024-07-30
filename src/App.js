import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Authentification } from './pages/Authentification';
import { Profile } from './pages/Profile';
import { Navbar } from './Components/Navbar';

import { auth } from './config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<BrowserRouter>
				{user && <Navbar />}
				<Routes>
					<Route path="/auth" element={<Authentification />} />
					<Route path="/home" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Navigate to="/auth" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
