import Head from "next/head"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { ParsedUrlQuery } from "querystring"
import { usePlugin, useCMS } from "tinacms"
import { InlineWysiwyg } from "react-tinacms-editor"
import { useGithubMarkdownForm } from "react-tinacms-github"
import { InlineForm, InlineText } from "react-tinacms-inline"
import { getGithubPreviewProps, parseMarkdown, PreviewData } from "next-tinacms-github"
import { GitFile } from "react-tinacms-github/dist/src/form/useGitFileSha"
import { getPostBySlug, getAllPosts, getPostRelativePathFromSlug } from "@/lib/blog"
import { PostContent, PostData } from "@/types/blog"
import Markdown from "@/components/markdown"

interface Params extends ParsedUrlQuery {
	slug: string
}

type PropData = {
	frontmatter: PostData
	markdownBody: PostContent
}

type Props = {
	file: Partial<GitFile<PropData>>
}

export default function Post({ file }: InferGetStaticPropsType<typeof getStaticProps>) {
	const cms = useCMS()
	const formOptions = {
		label: "Edit blog post",
		fields: [
			{
				label: "Title",
				name: "frontmatter.title",
				component: "text"
			},
			{
				label: 'Author',
				name: 'frontmatter.author',
				component: 'text'
			}
		]
	}
	const [data, form] = useGithubMarkdownForm(file as GitFile, formOptions) as [PropData, any]
	usePlugin(form)
	return (
		<article className="m-6">
			<Head>
				<title>
					{data.frontmatter.title}
				</title>
			</Head>
			<InlineForm form={form}>
				<h1>
					<InlineText name="frontmatter.title" />
				</h1>
				<div className="prose lg:prose-xl">
					<InlineWysiwyg
						name="markdownBody"
						sticky="72px"
						imageProps={{
							uploadDir: () => "/content/images/",
							parse: (media) => media.id,
							previewSrc(src) {
								return cms.media.previewSrc(src)
							}
						}}
					>
						<Markdown content={data.markdownBody} />
					</InlineWysiwyg>
				</div>
			</InlineForm>
		</article>
	)
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ preview, previewData, params }) => {
	if (preview) {
		return await getGithubPreviewProps({
			...(previewData as PreviewData<any>),
			fileRelativePath: getPostRelativePathFromSlug(params.slug),
			parse: parseMarkdown
		})
	}

	const {slug, content, ...data} = getPostBySlug(params.slug, [
		"title",
		"content"
	])

	return {
		props: {
			file: {
				fileRelativePath: getPostRelativePathFromSlug(slug),
				data: {
					frontmatter: data,
					markdownBody: content
				}
			}
		}
	}
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	return {
		paths: getAllPosts().map((posts) => {
			return {
				params: {
					slug: posts.slug
				}
			}
		}),
		fallback: false,
	}
}
