type PostContent = string

type PostData = {
	title?: string
	date?: string
	author?: string
	excerpt?: string
}

type PostType = PostData & {
	slug: string
	content?: PostContent
}

export type { PostType, PostData, PostContent }
