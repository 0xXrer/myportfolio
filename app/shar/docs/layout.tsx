import Link from "next/link"

import { Separator } from "@/components/ui/separator"

const docLinks = [
  { label: "Docs Home", href: "/shar/docs" },
  { label: "Getting Started", href: "/shar/docs/getting-started" },
  { label: "Policy", href: "/shar/docs/policy" },
  { label: "Audit", href: "/shar/docs/audit" },
]

export default function SharDocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#888]">
          Docs
        </p>
        <nav className="flex flex-col gap-2">
          {docLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-mono text-[#888] transition-colors hover:border-white/30 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="space-y-6">
        <Separator className="lg:hidden" />
        {children}
      </div>
    </div>
  )
}
