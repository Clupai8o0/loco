import { TabTypes } from "@/types";

const Tabs = ({ toggleTab, tab }: { toggleTab: () => void, tab: TabTypes}) => {
  return (
		<div className="parent-tab md:hidden">
			<ul className="flex flex-wrap -mb-px">
				<li className="mr-2" onClick={toggleTab}>
					<a className={tab === TabTypes.Content ? "selected" : "deselected"}>
						Content
					</a>
				</li>
				<li className="mr-2" onClick={toggleTab}>
					<a className={tab === TabTypes.About ? "selected" : "deselected"}>
						About
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Tabs