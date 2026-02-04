import { getSharMdx } from "@/lib/shar-mdx"

export default async function SharDocsIndexPage() {
  const content = await getSharMdx("docs/index.mdx")
  return <div className="space-y-6">{content}</div>
}
