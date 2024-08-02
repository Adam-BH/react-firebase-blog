import { db } from '../config/firebase';
import {
	addDoc,
	collection,
	doc,
	deleteDoc,
	getDocs,
	query,
	where,
	getDoc,
} from 'firebase/firestore';

import { useUser } from '../contexts/UserContext';
import { useEffect, useState } from 'react';

export const Blog = (props) => {
	const userData = useUser();

	const [idToDelete, setIdToDelete] = useState(null);

	const [likesNumber, setLikesNumber] = useState();
	const [alreadyLiked, setAlreadyLiked] = useState(false);

	const likesRef = collection(db, 'likes');
	const thisBlogsLikes = query(likesRef, where('blogId', '==', props.blog.id));

	const hasUserLikedQuerry = query(
		likesRef,
		where('blogId', '==', props.blog.id),
		where('userId', '==', userData.id)
	);

	useEffect(() => {
		getDocs(thisBlogsLikes).then((data) => {
			setLikesNumber(data.docs.length);
		});

		getDocs(hasUserLikedQuerry).then((data) => {
			if (data.docs.length === 0) {
				setAlreadyLiked(false);
			} else if (data.docs.length === 1) {
				setAlreadyLiked(true);
				setIdToDelete(data.docs[0].id);
			}
		});
	}, []);

	const addLike = () => {
		if (alreadyLiked === false) {
			addDoc(likesRef, {
				blogId: props.blog.id,
				userId: userData.id,
			}).then((doc) => {
				setLikesNumber(likesNumber + 1);
				setAlreadyLiked(true);
				setIdToDelete(doc.id);
			});
		} else {
			const likeDocument = doc(db, 'likes', idToDelete);
			deleteDoc(likeDocument).then(() => {
				setLikesNumber(likesNumber - 1);
				setAlreadyLiked(false);
			});
		}
	};

	return (
		<>
			<h1>{props.blog.writer} says:</h1>
			<h3>{props.blog.title}</h3>
			<p>{props.blog.description}</p>
			<button
				style={{ background: alreadyLiked ? 'green' : 'grey' }}
				onClick={addLike}
			>
				Like : {likesNumber}
			</button>
			<hr></hr>
		</>
	);
};
