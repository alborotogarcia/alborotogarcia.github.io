import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getGithubPreviewProps, parseJson, PreviewData } from 'next-tinacms-github'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

export default function Index({
	file
}: {
	file: any
}) {
	const formOptions = {
		label: 'Home Page',
		fields: [
			{ label: 'Title', name: 'title', component: 'text' },
			{ label: 'Description', name: 'description', component: 'text' }
		],
	}
	const [page, form] = useGithubJsonForm(file, formOptions)
	usePlugin(form)
	useGithubToolbarPlugins()
	return (
		<>
			<h1 className="m-2 text-5xl">{page.title}</h1>
			<h2 className="m-2 text-xl text-text-secondary">{page.description}</h2>
			<Link href="/blog">
				<a className="m-2 bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded">Blog</a>
			</Link>
		</>
	)
}

export const getStaticProps: GetStaticProps = async function({
	preview,
	previewData
}) {
	if (preview) {
		return getGithubPreviewProps({
			...(previewData as PreviewData<any>),
			fileRelativePath: 'config/page.json',
			parse: parseJson
		})
	}
	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: 'config/page.json',
				data: (await import('../config/page.json')).default
			}
		}
	}
}
