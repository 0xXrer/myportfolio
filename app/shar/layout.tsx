import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { label: "Overview", href: "/shar" },
  { label: "Docs", href: "/shar/docs" },
  { label: "Roadmap", href: "/shar/roadmap" },
]

export default function SharLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
        <header className="flex flex-col gap-6">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.3em] text-[#888]">MICROSITE</p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">SHAR</h1>
              <Badge variant="outline">WASM</Badge>
            </div>
            <p className="text-sm text-[#888]">
              Policy-first execution layer for WASM.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-mono text-[#888] transition-colors hover:border-white/30 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <Separator className="my-8" />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
