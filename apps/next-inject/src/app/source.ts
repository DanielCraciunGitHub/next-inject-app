import { loader } from "fumadocs-core/source"
import { createMDXSource, defaultSchemas } from "fumadocs-mdx"
import { z } from "zod"

import { map } from "../../.map"

const frontmatterSchema = defaultSchemas.frontmatter.extend({
  priceId: z.string(),
})

export const { getPage, getPages, pageTree } = loader({
  baseUrl: "/plugins",
  rootDir: "plugins",
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
})
