import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type CalloutProps = {
  title: string
  children: React.ReactNode
}

function Callout({ title, children }: CalloutProps) {
  return (
    <Card className="border border-white/10 bg-white/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-[#aaa]">{children}</CardContent>
    </Card>
  )
}

type ButtonLinkProps = {
  href: string
  children: React.ReactNode
  variant?: "default" | "outline"
}

const buttonLinkStyles: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  default:
    "inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-mono text-foreground transition-colors hover:bg-white/20",
  outline:
    "inline-flex items-center justify-center rounded-lg border border-white/10 px-3 py-1 text-xs font-mono text-[#888] transition-colors hover:border-white/30 hover:text-foreground",
}

function ButtonLink({ href, children, variant = "default" }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonLinkStyles[variant]}>
      {children}
    </Link>
  )
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-semibold tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold tracking-tight" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm text-[#aaa] leading-relaxed" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-foreground underline underline-offset-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc space-y-2 pl-6 text-sm text-[#aaa]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal space-y-2 pl-6 text-sm text-[#aaa]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-4 text-xs text-[#d6d6d6]" {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = className?.includes("language-")
    const styles = isBlock
      ? "font-mono text-[0.75rem] text-[#d6d6d6]"
      : "px-1.5 py-0.5 font-mono text-[0.75rem] text-[#e2e2e2]"

    return <code className={[styles, className].filter(Boolean).join(" ")} {...props} />
  },
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground/90" {...props} />
  ),
  hr: () => <Separator className="my-6" />,
  Callout,
  ButtonLink,
  Badge,
  Separator,
}

export { mdxComponents, Callout, ButtonLink }
