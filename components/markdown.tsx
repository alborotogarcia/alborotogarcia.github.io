import Link from "next/link"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
	content: string
}

export default function Markdown({ content }: Props) {
	return (
		<ReactMarkdown
			plugins={ [gfm] }
			rehypePlugins={ [rehypeRaw, rehypeSanitize] }
			children={ content }
			components={{
				a: ({children, href}) => {
					return <Link href={href}><a>{children}</a></Link>
				}
			}}
		/>
	)
}
