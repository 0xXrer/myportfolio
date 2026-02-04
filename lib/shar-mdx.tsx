import fs from "node:fs/promises"
import path from "node:path"

import { compileMDX } from "next-mdx-remote/rsc"

import { mdxComponents } from "@/components/mdx"

const contentRoot = path.join(process.cwd(), "content", "shar")

export async function getSharMdx(relativePath: string) {
  const source = await fs.readFile(path.join(contentRoot, relativePath), "utf8")
  const { content } = await compileMDX({ source, components: mdxComponents })
  return content
}
