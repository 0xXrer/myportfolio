import { getSharMdx } from "@/lib/shar-mdx"

export default async function SharRoadmapPage() {
  const content = await getSharMdx("roadmap.mdx")
  return <div className="space-y-6">{content}</div>
}
