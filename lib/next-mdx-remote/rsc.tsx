import React from "react"

type ComponentProps = Record<string, unknown>
type Components = Record<string, React.ComponentType<ComponentProps>>

type CompileOptions = {
  source: string
  components?: Components
}

type CompileResult = {
  content: React.ReactNode
}

const defaultComponents: Components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} />,
}

function renderInline(text: string, components: Components) {
  const parts: React.ReactNode[] = []
  const pattern = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      const Code = components.code ?? defaultComponents.code
      parts.push(<Code key={`code-${match.index}`}>{match[1]}</Code>)
    } else if (match[2] && match[3]) {
      const Anchor = components.a ?? defaultComponents.a
      parts.push(
        <Anchor key={`link-${match.index}`} href={match[3]}>
          {match[2]}
        </Anchor>
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function parseBlocks(source: string, components: Components) {
  const lines = source.split(/\r?\n/)
  const nodes: React.ReactNode[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index])
        index += 1
      }
      index += 1
      const Pre = components.pre ?? defaultComponents.pre
      const Code = components.code ?? defaultComponents.code
      nodes.push(
        <Pre key={`pre-${index}`}>
          <Code>{codeLines.join("\n")}</Code>
        </Pre>
      )
      continue
    }

    if (line.startsWith(":::callout")) {
      const title = line.replace(":::callout", "").trim()
      const contentLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith(":::")) {
        contentLines.push(lines[index])
        index += 1
      }
      index += 1
      const Callout = components.Callout
      if (Callout) {
        nodes.push(
          <Callout key={`callout-${index}`} title={title}>
            {renderInline(contentLines.join(" "), components)}
          </Callout>
        )
      } else {
        const Paragraph = components.p ?? defaultComponents.p
        nodes.push(
          <Paragraph key={`callout-fallback-${index}`}>
            {renderInline(contentLines.join(" "), components)}
          </Paragraph>
        )
      }
      continue
    }

    if (line.startsWith(":::actions")) {
      const actionLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith(":::")) {
        if (lines[index].trim()) {
          actionLines.push(lines[index].trim())
        }
        index += 1
      }
      index += 1
      const ButtonLink = components.ButtonLink
      if (ButtonLink) {
        nodes.push(
          <div key={`actions-${index}`} className="flex flex-wrap gap-3">
            {actionLines.map((item, actionIndex) => {
              const linkMatch = /\[([^\]]+)\]\(([^)]+)\)\s*(\w+)?/.exec(item)
              if (!linkMatch) {
                return null
              }
              const [, label, href, variant] = linkMatch
              return (
                <ButtonLink
                  key={`${href}-${actionIndex}`}
                  href={href}
                  variant={variant || "default"}
                >
                  {label}
                </ButtonLink>
              )
            })}
          </div>
        )
      }
      continue
    }

    if (line.startsWith("### ")) {
      const Heading = components.h3 ?? defaultComponents.h3
      nodes.push(
        <Heading key={`h3-${index}`}>{renderInline(line.slice(4), components)}</Heading>
      )
      index += 1
      continue
    }

    if (line.startsWith("## ")) {
      const Heading = components.h2 ?? defaultComponents.h2
      nodes.push(
        <Heading key={`h2-${index}`}>{renderInline(line.slice(3), components)}</Heading>
      )
      index += 1
      continue
    }

    if (line.startsWith("# ")) {
      const Heading = components.h1 ?? defaultComponents.h1
      nodes.push(
        <Heading key={`h1-${index}`}>{renderInline(line.slice(2), components)}</Heading>
      )
      index += 1
      continue
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = []
      while (index < lines.length && (lines[index].startsWith("- ") || lines[index].startsWith("* "))) {
        items.push(lines[index].slice(2))
        index += 1
      }
      const List = components.ul ?? defaultComponents.ul
      const Item = components.li ?? defaultComponents.li
      nodes.push(
        <List key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <Item key={`li-${index}-${itemIndex}`}>{renderInline(item, components)}</Item>
          ))}
        </List>
      )
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s/, ""))
        index += 1
      }
      const List = components.ol ?? defaultComponents.ol
      const Item = components.li ?? defaultComponents.li
      nodes.push(
        <List key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <Item key={`oli-${index}-${itemIndex}`}>{renderInline(item, components)}</Item>
          ))}
        </List>
      )
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length && lines[index].trim()) {
      paragraphLines.push(lines[index])
      index += 1
    }
    const Paragraph = components.p ?? defaultComponents.p
    nodes.push(
      <Paragraph key={`p-${index}`}>{renderInline(paragraphLines.join(" "), components)}</Paragraph>
    )
  }

  return nodes
}

export async function compileMDX({ source, components = {} }: CompileOptions): Promise<CompileResult> {
  const mergedComponents = { ...defaultComponents, ...components }
  const content = parseBlocks(source, mergedComponents)
  return { content }
}
