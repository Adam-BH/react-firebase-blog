import { useState } from 'react';

import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useUser } from '../contexts/UserContext';

export const CreateBlogForm = ({ setBlogs }) => {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');

	const userData = useUser();

	const blogsRef = collection(db, 'blogs');
	const handleSubmit = (e) => {
		e.preventDefault();
		const newBlog = {
			title: title,
			description: desc,
			writer: userData.name,
			userId: userData.id,
			time: serverTimestamp(),
		};
		addDoc(blogsRef, newBlog).then(() => {
			setTitle('');
			setDesc('');
			e.target.reset();

			setBlogs((prev) => {
				return [...prev, newBlog];
			});
		});
	};

	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<input
				onChange={(e) => setTitle(e.target.value)}
				type="text"
				placeholder="title"
				required
			/>
			<textarea
				onChange={(e) => setDesc(e.target.value)}
				type="text"
				placeholder="description"
				required
			/>
			<input type="submit" />
		</form>
	);
};
