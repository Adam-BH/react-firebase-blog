import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';

import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { Blog } from '../Components/Blog';

export const Profile = () => {
	const [user] = useAuthState(auth);

	const [userBlogs, setUserBlogs] = useState([]);

	const blogsRef = collection(db, 'blogs');
	const userBlogsQuerry = query(
		blogsRef,
		where('userId', '==', user.uid),
		orderBy('time')
	);
	useEffect(() => {
		getDocs(userBlogsQuerry).then((data) => {
			setUserBlogs(data.docs.map((doc) => doc.data()));
		});
	}, []);

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return (
		<div>
			<h1>Profile page</h1>
			<div>
				<img alt="pfp" src={user.photoURL} />
				<h2>Name: {user.displayName}</h2>
				<h2>Email: {user.email}</h2>
			</div>
			<hr></hr>
			<h2>Your blogs</h2>
			{userBlogs.map((blog) => {
				return <Blog blog={blog} />;
			})}
		</div>
	);
};
