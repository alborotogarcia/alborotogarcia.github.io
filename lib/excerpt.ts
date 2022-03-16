type ExcerptOpts = number | {
	characters?: number
	words?: number
}

export default function excerpt(string: string, opts: ExcerptOpts): string {
	let excerpt = string.replace(/^\#.*$/, "")
	if (typeof opts === "number") {
		excerpt = words(excerpt, opts)
	} else {
		if (opts.words !== undefined) {
			excerpt = words(excerpt, opts.words)
		}
		if (opts.characters !== undefined) {
			excerpt = characters(excerpt, opts.characters)
		}
	}
	if (excerpt === string) {
		return excerpt
	}
	if (typeof opts !== "number" && opts.characters !== undefined && excerpt.length > opts.characters - 3 ) {
		excerpt = characters(excerpt, opts.characters - 3)
	}
	return excerpt + "..."
}

function words(string: string, words: number): string {
	if (words < 0) {
		return ""
	}
	return string.split(" ").slice(0, words).join(" ")
}

function characters(string: string, characters: number): string {
	if (characters < 0) {
		return ""
	}
	return string.slice(0, characters)
}
