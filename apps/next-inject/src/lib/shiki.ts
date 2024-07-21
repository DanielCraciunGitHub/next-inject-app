import { createHighlighter, type Highlighter } from "shiki"

export let highlighter: Highlighter

export async function highlight(code: string, lang: string) {
  if (!highlighter) {
    highlighter = await createHighlighter({
      langs: ["bash", "ts", "tsx"],
      themes: ["github-light", "github-dark"],
    })
  }

  const html = highlighter.codeToHtml(code, {
    lang,
    defaultColor: false,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    transformers: [
      {
        name: "remove-pre",
        root: (root) => {
          if (root.children[0].type !== "element") return

          return {
            type: "root",
            children: root.children[0].children,
          }
        },
      },
    ],
  })

  return html
}
