export const Blog = (props) => {
	return (
		<>
			<h1>{props.blog.writer} says:</h1>
			<h3>{props.blog.title}</h3>
			<p>{props.blog.description}</p>
			<hr></hr>
		</>
	);
};
