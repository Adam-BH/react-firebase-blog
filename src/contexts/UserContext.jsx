import { createContext, useEffect, useContext } from 'react';

import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDocs, collection, where, query } from 'firebase/firestore';

const userContext = createContext();

export const UserProvider = ({ children }) => {
	const [user] = useAuthState(auth);
	let userData;

	if (user) {
		userData = {
			id: user.uid,
			name: user.displayName,
			email: user.email,
			photoUrl: user.photoURL,
			role: '',
		};
		const usersRef = collection(db, 'users');
		const userQuerry = query(usersRef, where('userId', '==', user?.uid));
		getDocs(userQuerry).then((data) => {
			userData.role = data.docs[0].data().userRole;
		});
	}
	if (!user) {
		userData = null;
	}
	return (
		<userContext.Provider value={userData}>{children}</userContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(userContext);

	if (context) {
		return context;
	}
};
