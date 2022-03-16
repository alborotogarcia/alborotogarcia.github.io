import excerpt from "./excerpt"

test("negative parameters      | number", () => {
	expect(excerpt("foo", -1)).toBe("...")
	expect(excerpt("bar", -10)).toBe("...")
	expect(excerpt("baz", -100)).toBe("...")
})

test("negative parameters      | words", () => {
	expect(excerpt("foo", { words: -1 })).toBe("...")
	expect(excerpt("bar", { words: -10 })).toBe("...")
	expect(excerpt("baz", { words: -100 })).toBe("...")
})

test("negative parameters      | characters", () => {
	expect(excerpt("foo", { characters: -1 })).toBe("...")
	expect(excerpt("bar", { characters: -10 })).toBe("...")
	expect(excerpt("baz", { characters: -100 })).toBe("...")
})

test("negative parameters      | words & characters", () => {
	expect(excerpt("foo", { words: -1, characters: -1 })).toBe("...")
	expect(excerpt("bar", { words: -10, characters: -10 })).toBe("...")
	expect(excerpt("baz", { words: -100, characters: -100 })).toBe("...")
})

test("content is within bounds | number", () => {
	expect(excerpt("foo", 10)).toBe("foo")
	expect(excerpt("bar", 50)).toBe("bar")
	expect(excerpt("baz", 1)).toBe("baz")
	expect(excerpt("Lorem ipsum dolor sit amet", 5)).toBe("Lorem ipsum dolor sit amet")
})

test("content is within bounds | words", () => {
	expect(excerpt("foo", { words: 10 })).toBe("foo")
	expect(excerpt("bar", { words: 50 })).toBe("bar")
	expect(excerpt("baz", { words: 1 })).toBe("baz")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5 })).toBe("Lorem ipsum dolor sit amet")
})

test("content is within bounds | characters", () => {
	expect(excerpt("foo", { characters: 10 })).toBe("foo")
	expect(excerpt("bar", { characters: 150 })).toBe("bar")
	expect(excerpt("baz", { characters: 3 })).toBe("baz")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 26 })).toBe("Lorem ipsum dolor sit amet")
})

test("content is within bounds | words & characters", () => {
	expect(excerpt("foo", { words: 1, characters: 10 })).toBe("foo")
	expect(excerpt("bar", { words: 2, characters: 3 })).toBe("bar")
	expect(excerpt("baz", { words: 1, characters: 3 })).toBe("baz")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 26 })).toBe("Lorem ipsum dolor sit amet")
})

test("content is out of bounds | number", () => {
	expect(excerpt("Lorem ipsum dolor sit amet", 0)).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", 1)).toBe("Lorem...")
	expect(excerpt("Lorem ipsum dolor sit amet", 2)).toBe("Lorem ipsum...")
	expect(excerpt("Lorem ipsum dolor sit amet", 3)).toBe("Lorem ipsum dolor...")
	expect(excerpt("Lorem ipsum dolor sit amet", 4)).toBe("Lorem ipsum dolor sit...")
})

test("content is out of bounds | words", () => {
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 0 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1 })).toBe("Lorem...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2 })).toBe("Lorem ipsum...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3 })).toBe("Lorem ipsum dolor...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4 })).toBe("Lorem ipsum dolor sit...")
})

test("content is out of bounds | characters", () => {
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 0 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 1 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 2 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 3 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 4 })).toBe("L...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 5 })).toBe("Lo...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 10 })).toBe("Lorem i...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 22 })).toBe("Lorem ipsum dolor s...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 23 })).toBe("Lorem ipsum dolor si...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 24 })).toBe("Lorem ipsum dolor sit...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 25 })).toBe("Lorem ipsum dolor sit ...")
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 10 }).length).toBe(10)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 25 }).length).toBe(25)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 24 }).length).toBe(24)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 23 }).length).toBe(23)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 22 }).length).toBe(22)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 5 }).length).toBe(5)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 4 }).length).toBe(4)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 3 }).length).toBe(3)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 2 }).length).toBe(3)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 1 }).length).toBe(3)
	expect(excerpt("Lorem ipsum dolor sit amet", { characters: 0 }).length).toBe(3)
})

test("content is out of bounds | words & characters | only words", () => {
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 100 })).toBe("Lorem...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 100 })).toBe("Lorem ipsum...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 100 })).toBe("Lorem ipsum dolor...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4, characters: 100 })).toBe("Lorem ipsum dolor sit...")
})

test("content is out of bounds | words & characters | only characters", () => {
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 0 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 1 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 2 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 3 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 4 })).toBe("L...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 5 })).toBe("Lo...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 10 })).toBe("Lorem i...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 25 })).toBe("Lorem ipsum dolor sit ...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 24 })).toBe("Lorem ipsum dolor sit...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 23 })).toBe("Lorem ipsum dolor si...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 22 })).toBe("Lorem ipsum dolor s...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 10 }).length).toBe(10)
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 25 }).length).toBe(25)
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 24 }).length).toBe(24)
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 23 }).length).toBe(23)
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 5, characters: 22 }).length).toBe(22)
})

test("content is out of bounds | words & characters | both", () => {
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4, characters: 24 })).toBe("Lorem ipsum dolor sit...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4, characters: 23 })).toBe("Lorem ipsum dolor si...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4, characters: 22 })).toBe("Lorem ipsum dolor s...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4, characters: 21 })).toBe("Lorem ipsum dolor ...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 4, characters: 20 })).toBe("Lorem ipsum dolor...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 20 })).toBe("Lorem ipsum dolor...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 19 })).toBe("Lorem ipsum dolo...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 18 })).toBe("Lorem ipsum dol...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 17 })).toBe("Lorem ipsum do...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 16 })).toBe("Lorem ipsum d...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 15 })).toBe("Lorem ipsum ...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 3, characters: 14 })).toBe("Lorem ipsum...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 14 })).toBe("Lorem ipsum...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 13 })).toBe("Lorem ipsu...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 12 })).toBe("Lorem ips...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 11 })).toBe("Lorem ip...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 10 })).toBe("Lorem i...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 9 })).toBe("Lorem ...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 2, characters: 8 })).toBe("Lorem...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 8 })).toBe("Lorem...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 7 })).toBe("Lore...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 6 })).toBe("Lor...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 5 })).toBe("Lo...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 4 })).toBe("L...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 1, characters: 3 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 0, characters: 3 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 0, characters: 2 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 0, characters: 1 })).toBe("...")
	expect(excerpt("Lorem ipsum dolor sit amet", { words: 0, characters: 0 })).toBe("...")
})

test("random bounds            | all", () => {
	const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	const checks = 1000
	const messageWords = countWords(message)
	const messageCharacters = countCharacters(message)
	for (let i = 0; i < checks; i++) {
		check(message, randomInt(0, messageWords * 2), randomInt(0, messageCharacters * 2))
	}
})

test("complete range           | all", () => {
	const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	for (let words = 0; words <= countWords(message) + 1; words++) {
		for (let characters = 0; characters <= countCharacters(message) + 1; characters++) {
			check(message, words, characters)
		}
	}
})

function check(message: string, words: number, characters: number) {
	const messageWords = countWords(message)
	const messageCharacters = countCharacters(message)
	let excerptNumber = excerpt(message, words)
	let excerptWords = excerpt(message, { words })
	let excerptCharacters = excerpt(message, { characters })
	let excerptBoth = excerpt(message, { words, characters })
	if (words >= messageWords && characters >= messageCharacters) {
		expect(excerptNumber).toBe(message)
		expect(excerptWords).toBe(message)
		expect(excerptCharacters).toBe(message)
		expect(excerptBoth).toBe(message)
	} else {
		if (words === 0) {
			expect(excerptNumber).toBe("...")
			expect(excerptWords).toBe("...")
			expect(excerptBoth).toBe("...")
		} else if (words >= messageWords) {
			expect(excerptNumber).toBe(message)
			expect(excerptWords).toBe(message)
			expect(countWords(excerptBoth)).toBeLessThanOrEqual(words)
		} else {
			expect(countWords(excerptNumber)).toBeLessThanOrEqual(words)
			expect(countWords(excerptWords)).toBeLessThanOrEqual(words)
			expect(countWords(excerptBoth)).toBeLessThanOrEqual(words)
		}
		if (characters <= 3) {
			expect(excerptCharacters).toBe("...")
			expect(excerptBoth).toBe("...")
		} else if (characters >= messageCharacters) {
			expect(excerptCharacters).toBe(message)
			expect(countCharacters(excerptBoth)).toBeLessThanOrEqual(characters)
		} else {
			expect(countCharacters(excerptCharacters)).toBeLessThanOrEqual(characters)
			expect(countCharacters(excerptBoth)).toBeLessThanOrEqual(characters)
		}
	}
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

function countWords(str: string): number {
	return str.split(" ").length
}

function countCharacters(str: string): number {
	return str.length
}