import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import { getFiles as getGithubFiles, parseMarkdown, getGithubFile } from 'next-tinacms-github'
import { PostType } from "@/types/blog"
import excerpt from "./excerpt"

const postsRelativePath = "content/blog"
const postsDirectory = join(process.cwd(), postsRelativePath)

function getPostFileFromSlug(slug: string): string {
	return `${slug}.md`
}

function getPostSlugFromFile(file: string): string {
	return file.replace(/\.md$/, "")
}

export function getPostRelativePathFromSlug(slug: string): string {
	return join(postsRelativePath, getPostFileFromSlug(slug))
}

export function getPostFiles(): string[] {
	try {
		return fs.readdirSync(postsDirectory)
	} catch(err) {
		return []
	}
}

export async function getGithubPostFiles(previewData: any): Promise<string[]> {
	try {
		return (await getGithubFiles(
			postsRelativePath,
			previewData.working_repo_full_name,
			previewData.head_branch,
			previewData.github_access_token
		)).map(f => f.replace(postsRelativePath + "/", ""))
	} catch(err) {
		return []
	}
}

export function getPostBySlug(slug: string, fields: (keyof PostType)[] = []): PostType {
	return getPostByFile(getPostFileFromSlug(slug), fields)
}

export function getPostByFile(file: string, fields: (keyof PostType)[] = []): PostType {
	fields = fields.filter(field => field !== 'slug')
	if (fields.length !== 0) {
		// Only read file if more data is requested
		const md = fs.readFileSync(join(postsDirectory, file), 'utf8')
		const { data, content } = matter(md)
		return getPost(getPostSlugFromFile(file), content, data, fields)
	}
	return {
		slug: getPostSlugFromFile(file)
	}
}

export async function getGithubPostByFile(file: string, fields: (keyof PostType)[] = [], previewData: any): Promise<PostType> {
	fields = fields.filter(field => field !== 'slug')
	if (fields.length !== 0) {
		// Only read file if more data is requested
		const githubFile = await getGithubFile<any>({
			...previewData,
			fileRelativePath: postsRelativePath + "/" + file,
			parse: parseMarkdown,
		})
		return getPost(getPostSlugFromFile(file), githubFile.data.markdownBody, githubFile.data.frontmatter, fields)
	}
	return {
		slug: getPostSlugFromFile(file)
	}
}

function getPost(slug: string, content: string, data: any, fields: (keyof PostType)[] = []): PostType {
	const post: PostType = {
		slug
	}
	fields = fields.filter(field => field !== 'slug')
	if (fields.length !== 0) {
		// Only expose requested data
		fields.forEach((field) => {
			if (field === "content") {
				post.content = content
			} else if (field === "excerpt") {
				if (data[field]) {
					post.excerpt = data[field]
				} else {
					post.excerpt = excerpt(content, { characters: 150 })
				}
			} else if (data[field]) {
				post[field] = data[field]
			}
		})
	}
	return post
}

export function getAllPosts(fields: (keyof PostType)[] = []): PostType[] {
	return getPostFiles()
		.map((file) => getPostByFile(file, fields))
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

export async function getAllGithubPosts(fields: (keyof PostType)[] = [], previewData: any): Promise<PostType[]> {
	const posts = await getGithubPostFiles(previewData)
	return (await Promise.all(
		posts.map(async file => await getGithubPostByFile(file, fields, previewData))
	)).sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
