/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],

	theme: {
		extend: {
			colors: {
				black: "#121417",
				shade_1: "#0A8754",
				shade_2: "#6E71C4",
				shade_3: "#FDE74C",
				shade_4: "#EA484E",
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
		},
	},

	// plugins: [],
};
