import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const Navbar = () => {
	const navigate = useNavigate();
	const [user] = useAuthState(auth);

	const [role, setRole] = useState('user');

	const usersRef = collection(db, 'users');
	const userQuerry = query(usersRef, where('userId', '==', user.uid));
	useEffect(() => {
		getDocs(userQuerry).then((data) => {
			data.docs.map((doc) => {
				setRole(doc.data().userRole);
			});
		});
	}, []);

	const handleLogOut = () => {
		signOut(auth).then(() => {
			navigate('/');
		});
	};

	return (
		<nav>
			{role === 'admin' && <Link to="/admin">Admin Pannel</Link>}
			<Link to="/home">Home</Link>
			<Link to="/profile">Profile</Link>
			<button onClick={handleLogOut}>Log out</button>
		</nav>
	);
};
