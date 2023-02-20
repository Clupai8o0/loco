import Title from "../components/title";
import Card from "../components/card";

export default function Home() {
	return (
		<main className="main">
			<Title text="Home" />
			<Card
				title="Card Title"
				paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, quaerat sapiente perspiciatis, velit impedit officia soluta dolore tempore consectetur error quos dolores! Mollitia harum voluptates ex labore minima veniam! Ratione!"
			/>
		</main>
	);
}
