import { loader } from "fumadocs-core/source"
import { createMDXSource, defaultSchemas } from "fumadocs-mdx"
import { z } from "zod"

import { map } from "../../.map"

export const frontmatterSchema = defaultSchemas.frontmatter.extend({
  priceId: z.union([z.string().regex(/^price_.+$/), z.enum(["Undefined"])]),
})

export const plugins = loader({
  baseUrl: "/plugins",
  rootDir: "plugins",
  source: createMDXSource(map, { schema: { frontmatter: frontmatterSchema } }),
})
export const dashboard = loader({
  baseUrl: "/dashboard",
  rootDir: "dashboard",
  source: createMDXSource(map),
})
