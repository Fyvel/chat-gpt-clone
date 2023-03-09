/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				'light': '#F5F5F5',
				'dark': '#343541',
			},
			textColor: {
				'light': '#333333',
				'dark': '#F5F5F5',
			},
			colors: {
				'primary': '#3291FF',
				'secondary': '#444444',
			},
			fontFamily: {
				'sans': ['Graphik', 'sans-serif'],
			},
			screens: {
				sm: '600px',
				md: '900px',
				lg: '1200px',
				xl: '1800px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
