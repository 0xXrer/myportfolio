import { getSharMdx } from "@/lib/shar-mdx"

export default async function SharGettingStartedPage() {
  const content = await getSharMdx("docs/getting-started.mdx")
  return <div className="space-y-6">{content}</div>
}
