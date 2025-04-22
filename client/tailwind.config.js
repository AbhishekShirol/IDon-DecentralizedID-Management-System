/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			colors: {
				primary: {
					bg: '#15171a',
					card: 'rgba(37, 40, 43, 0.95)',
					text: '#f9fafb',
				},
				secondary: {
					bg: '#1f2937',
					text: '#d1d5db',
				},
				accent: {
					DEFAULT: '#60a5fa',
					hover: '#3b82f6',
				},
			},
			boxShadow: {
				card: '0 4px 20px rgba(0, 0, 0, 0.3)',
			},
			borderColor: {
				DEFAULT: 'rgba(255, 255, 255, 0.1)',
			},
		},
	},
	plugins: [],
}