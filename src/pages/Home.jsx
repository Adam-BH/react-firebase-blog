import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { CreateBlogForm } from '../Components/CreateBlogForm';
import { Blog } from '../Components/Blog';

export const Home = () => {
	const navigate = useNavigate();
	const [user] = useAuthState(auth);

	const [blogs, setBlogs] = useState([]);
	const blogsRef = collection(db, 'blogs');

	useEffect(() => {
		getDocs(blogsRef).then((data) => {
			setBlogs(
				data.docs.map((doc) => {
					return { ...doc.data(), id: doc.id };
				})
			);
		});
	}, []);

	const handleLogOut = () => {
		signOut(auth).then(() => {
			navigate('/');
		});
	};

	if (!user) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h1>Home page of {user.displayName}</h1>
				<img width="100" alt="pfp" src={user.photoURL} />
				<button onClick={handleLogOut}>Log out</button>
			</div>
			<div>
				<h2>create a new Blog</h2>
				<CreateBlogForm />
			</div>
			<div>
				<h2>Blogs</h2>
				{blogs.map((blog) => {
					return <Blog blog={blog} />;
				})}
			</div>
		</div>
	);
};
