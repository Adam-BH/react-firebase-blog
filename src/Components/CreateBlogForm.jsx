import { useState } from 'react';

import { db, auth } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';

export const CreateBlogForm = () => {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');

	const [user] = useAuthState(auth);

	const blogsRef = collection(db, 'blogs');
	const handleSubmit = (e) => {
		e.preventDefault();
		addDoc(blogsRef, {
			title: title,
			description: desc,
			userId: user.uid,
		}).then(() => {
			setTitle('');
			setDesc('');
			e.target.reset();
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
