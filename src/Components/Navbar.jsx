import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

import { useUser } from '../contexts/UserContext';

export const Navbar = () => {
	const navigate = useNavigate();
	const userData = useUser();

	const handleLogOut = () => {
		signOut(auth).then(() => {
			navigate('/');
		});
	};

	return (
		<nav>
			{userData.role === 'admin' && <Link to="/admin">Admin Pannel</Link>}
			<Link to="/home">Home</Link>
			<Link to="/profile">Profile</Link>
			<button onClick={handleLogOut}>Log out</button>
		</nav>
	);
};
