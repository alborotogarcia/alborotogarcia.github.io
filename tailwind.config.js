module.exports = {
	plugins: [
		require("tailwindcss-material"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography")
	],
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: [
			"./components/**/*.{js,ts,jsx,tsx}",
			"./pages/**/*.{js,ts,jsx,tsx}"
		]
	},
	theme: {
		extend: {
			colors: {
				accent: {
					primary: "var(--accent-primary)",
					secondary: "var(--accent-secondary)",
					tertiary: "var(--accent-tertiary)"
				},
				bg: {
					primary: "var(--bg-bg-primary)",
					code: "var(--bg-bg-code)"
				},
				text: {
					primary: {
						DEFAULT: "var(--text-text-primary)",
						light: "var(--text-text-primary-light)"
					},
					secondary: {
						DEFAULT: "var(--text-text-secondary)",
						light: "var(--text-text-secondary-light)"
					},
					tertiary: {
						DEFAULT: "var(--text-text-tertiary)",
						light: "var(--text-text-tertiary-light)"
					},
					code: "var(--text-text-code)"
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.text.primary.light"),
						"[class~='lead']": {
							color: theme("colors.text.tertiary.DEFAULT")
						},
						a: {
							color: theme("colors.accent.primary"),
							"&:hover": {
								color: theme("colors.accent.secondary")
							}
						},
						strong: {
							color: theme("colors.text.primary.DEFAULT")
						},
						"ol > li::before": {
							color: theme("colors.text.secondary.light")
						},
						"ul > li::before": {
							backgroundColor: theme("colors.text.tertiary.light")
						},
						hr: {
							borderColor: theme("colors.text.tertiary.light")
						},
						blockquote: {
							color: theme("colors.text.primary.DEFAULT"),
							borderLeftColor: theme("colors.text.tertiary.light")
						},
						h1: {
							color: theme("colors.text.primary.DEFAULT")
						},
						h2: {
							color: theme("colors.text.primary.light")
						},
						h3: {
							color: theme("colors.text.primary.light")
						},
						h4: {
							color: theme("colors.text.secondary.DEFAULT")
						},
						h5: {
							color: theme("colors.text.secondary.light")
						},
						h6: {
							color: theme("colors.text.secondary.light")
						},
						'figure figcaption': {
							color: theme("colors.text.secondary.light")
						},
						code: {
							color: theme("colors.text.primary.DEFAULT")
						},
						'a code': {
							color: theme("colors.text.primary.DEFAULT")
						},
						pre: {
							color: theme("colors.text.code"),
							backgroundColor: theme("colors.bg.code")
						},
						thead: {
							color: theme("colors.text.primary.DEFAULT"),
							borderBottomColor: theme("colors.text.tertiary.DEFAULT")
						},
						'tbody tr': {
							borderBottomColor: theme("colors.text.tertiary.light")
						}
					}
				}
			})
		}
	}
}
