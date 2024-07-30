import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { db } from '../config/firebase';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';
import { Blog } from '../Components/Blog';

import { useUser } from '../contexts/UserContext';

export const Profile = () => {
	const userData = useUser();

	const [userBlogs, setUserBlogs] = useState([]);

	const blogsRef = collection(db, 'blogs');
	const userBlogsQuerry = query(
		blogsRef,
		where('userId', '==', userData.id),
		orderBy('time')
	);
	useEffect(() => {
		getDocs(userBlogsQuerry).then((data) => {
			setUserBlogs(data.docs.map((doc) => doc.data()));
		});
	}, []);

	if (!userData) {
		return <Navigate to="/" replace />;
	}

	return (
		<div>
			<h1>Profile page</h1>
			<div>
				<img alt="pfp" src={userData.photoURL} />
				<h2>Name: {userData.name}</h2>
				<h2>Email: {userData.email}</h2>
			</div>
			<hr></hr>
			<h2>Your blogs</h2>
			{userBlogs.map((blog) => {
				return <Blog blog={blog} />;
			})}
		</div>
	);
};
