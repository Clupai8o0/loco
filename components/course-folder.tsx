import {
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";

const Folder = ({ title, content }: { title: string; content: any }) => {
	return (
		<AccordionItem>
			<AccordionItemHeading>
				<AccordionItemButton className="font-sans capitalize text-white font-medium text-sm md:text-base flex justify-between p-4 bg-[#0d0f13] rounded-t-md border-b border-gray-700">
					{title}{" "}
					<img
						src="/assets/arrow.svg"
						alt="accordion arrow icon"
						className="max-w-[18px]"
					/>
				</AccordionItemButton>
			</AccordionItemHeading>
			<AccordionItemPanel className="pl-3 bg-[#0d0f13] rounded-b-md">
				{content}
			</AccordionItemPanel>
		</AccordionItem>
	);
};

export default Folder;
