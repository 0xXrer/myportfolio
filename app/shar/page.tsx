import { getSharMdx } from "@/lib/shar-mdx"

export default async function SharLandingPage() {
  const content = await getSharMdx("landing.mdx")
  return <div className="space-y-6">{content}</div>
}
