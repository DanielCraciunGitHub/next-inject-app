import type { HTMLAttributes } from "react"
import * as Base from "fumadocs-ui/components/codeblock"

import { highlight } from "@/lib/shiki"

export type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  code: string
  wrapper?: Base.CodeBlockProps
  lang: "bash" | "ts" | "tsx"
}

export async function CodeBlock({
  code,
  lang,
  wrapper,
  ...props
}: CodeBlockProps) {
  const html = await highlight(code, lang)

  return (
    <Base.CodeBlock {...wrapper}>
      <Base.Pre {...props} dangerouslySetInnerHTML={{ __html: html }} />
    </Base.CodeBlock>
  )
}
