// Assume you're using Fumadocs UI
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

import { CodeBlock } from "@/components/CodeBlock"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Tab,
    Tabs,
    CodeBlock,
  }
}
