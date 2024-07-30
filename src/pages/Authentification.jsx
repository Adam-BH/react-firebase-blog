import { signInWithPopup } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

import { auth, provider, db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

import { useUser } from '../contexts/UserContext';

export const Authentification = () => {
	const navigate = useNavigate();

	const usersRef = collection(db, 'users');
	const signIn = () => {
		signInWithPopup(auth, provider).then((userCredentials) => {
			if (
				userCredentials.user.reloadUserInfo.createdAt ===
				userCredentials.user.reloadUserInfo.lastLoginAt
			) {
				addDoc(usersRef, {
					userId: userCredentials.user.uid,
					userRole: 'user',
				}).then(() => {
					console.log('doc added');
				});
			}

			navigate('/home');
		});
	};

	const userData = useUser();
	if (userData) {
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
