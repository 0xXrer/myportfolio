import { getSharMdx } from "@/lib/shar-mdx"

export default async function SharAuditPage() {
  const content = await getSharMdx("docs/audit.mdx")
  return <div className="space-y-6">{content}</div>
}
