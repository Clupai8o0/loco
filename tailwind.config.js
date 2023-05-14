/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				black: "#121417",
				"soft-blue": "#D0BCFF",
				component: "#17191D",
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
	},
};
