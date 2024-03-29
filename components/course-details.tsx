import Title from "./title";

const CourseDetails = ({
	title,
	styles,
}: {
	styles: string;
	title: string;
}) => (
	<article className={styles}>
		<Title text={title} margin="mt-4 mb-4" />
		<p className="font-sans text-sm opacity-80">
			His parents continued to question him. He didn't know what to say to them
			since they refused to believe the truth. He explained again and again, and
			they dismissed his explanation as a figment of his imagination. There was
			no way that grandpa, who had been dead for five years, could have told him
			where the treasure had been hidden.
		</p>
	</article>
);

export default CourseDetails;
