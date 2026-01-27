"use client"

import { useState } from "react"
import { RiArrowLeftBoxLine, RiFileCopyLine, RiCheckLine } from "@remixicon/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPage() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: "",
    description: "",
    url: "",
    image: "",
    tags: "",
  })

  const projectJson = {
    name: form.name || "Project Name",
    description: form.description || "Project description",
    url: form.url || "https://github.com/0xXrer/project",
    ...(form.image && { image: form.image }),
    tags: form.tags
      ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
  }

  const jsonOutput = JSON.stringify(projectJson, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <RiArrowLeftBoxLine className="w-4 h-4" />
          back
        </Link>

        <h1 className="text-xl font-semibold mb-2">Add Project</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Fill the form and copy the JSON to add to{" "}
          <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">
            /data/projects.json
          </code>
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Name
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="My Project"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Description
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A short description of the project"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              URL
            </label>
            <Input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://github.com/0xXrer/project"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Image Path{" "}
              <span className="text-muted-foreground/60">(optional)</span>
            </label>
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/projects/my-project.jpg"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Tags{" "}
              <span className="text-muted-foreground/60">
                (comma separated)
              </span>
            </label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="TypeScript, React, Next.js"
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Output</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
            >
              {copied ? (
                <>
                  <RiCheckLine className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <RiFileCopyLine className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <pre className="bg-secondary/50 border border-border rounded-lg p-4 text-sm overflow-x-auto">
            <code>{jsonOutput}</code>
          </pre>
        </div>
      </div>
    </main>
  )
}
