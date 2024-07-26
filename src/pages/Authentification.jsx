import { signInWithPopup } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

import { auth, provider } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Authentification = () => {
	const navigate = useNavigate();
	const signIn = () => {
		signInWithPopup(auth, provider).then(() => {
			navigate('/home');
		});
	};

	const [user] = useAuthState(auth);
	if (user) {
		return <Navigate to="/home" />;
	}

	return (
		<div>
			<h1>Auth Page</h1>
			<p>Please sign in with google to continue</p>
			<button onClick={signIn}>Sign in with google</button>
		</div>
	);
};
