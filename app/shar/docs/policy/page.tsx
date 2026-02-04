import { getSharMdx } from "@/lib/shar-mdx"

export default async function SharPolicyPage() {
  const content = await getSharMdx("docs/policy.mdx")
  return <div className="space-y-6">{content}</div>
}
