import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { db } from '../config/firebase';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { CreateBlogForm } from '../Components/CreateBlogForm';
import { Blog } from '../Components/Blog';
import { useUser } from '../contexts/UserContext';

export const Home = () => {
	const userData = useUser();

	const [blogs, setBlogs] = useState([]);
	const blogsRef = collection(db, 'blogs');

	const blogsQuerry = query(blogsRef, orderBy('time'));

	useEffect(() => {
		getDocs(blogsQuerry).then((data) => {
			setBlogs(
				data.docs.map((doc) => {
					return { ...doc.data(), id: doc.id };
				})
			);
		});
	}, []);
	if (!userData) {
		return <Navigate to="/" replace />;
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
				<h1>Home page of {userData.name}</h1>
			</div>
			<div>
				<h2>create a new Blog</h2>
				<CreateBlogForm setBlogs={setBlogs} />
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
