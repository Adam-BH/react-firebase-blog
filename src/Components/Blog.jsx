export const Blog = (props) => {
	console.log(props.blog);
	return (
		<>
			<h3>{props.blog.title}</h3>
			<p>{props.blog.description}</p>
			<hr></hr>
		</>
	);
};
