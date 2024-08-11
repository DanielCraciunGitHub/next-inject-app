import "./src/env.mjs"

import { remarkInstall } from "fumadocs-docgen"
import createMDX from "fumadocs-mdx/config"

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [remarkInstall],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
}

export default withMDX(nextConfig)
