import {
	Accordion as MUIAccordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = ({ title, content }: { title: string; content: any }) => {
	return (
		<MUIAccordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon color="primary" />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				className="bg-[rgba(21,23,26,1)] w-full font-sans text-[14px] text-white"
			>
				<p className="opacity-80 capitalize">{title}</p>
			</AccordionSummary>
			<AccordionDetails className="bg-[rgba(19,20,21,1)] w-full font-sans text-white text-[14px]">
				{content}
			</AccordionDetails>
		</MUIAccordion>
	);
};

export default Accordion;
