import { RiGithubFill, RiDiscordFill, RiExternalLinkFill } from "@remixicon/react"

const projects = [
  {
    name: "MathOBF-lua",
    description: "Multi-layer VM obfuscator for Lua",
    tech: ["Lua", "Security", "Reverse Engineering"],
    github: "https://github.com/0xXrer/MathOBF-lua",
  },
  {
    name: "Process-Guard",
    description: "Real-time injection detection for Windows",
    tech: ["Rust", "ML", "ETW"],
    github: "https://github.com/0xXrer/Process-Guard",
  },
  {
    name: "react-material-3-pure",
    description: "Material Design 3 for React",
    tech: ["TypeScript", "React", "UI"],
    github: "https://github.com/0xXrer/react-material-3-pure",
    demo: "https://react-material-3-pure.vercel.app",
  },
  {
    name: "ff",
    description: "Blazingly fast file finder",
    tech: ["C++17", "CLI"],
    github: "https://github.com/0xXrer/ff",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-20">
        <header className="flex flex-col gap-6">
          <div className="space-y-3">
            <p className="text-sm tracking-[0.3em] text-[#888]">PORTFOLIO</p>
            <h1 className="text-4xl font-semibold tracking-tight">xrer</h1>
            <p className="font-mono text-sm text-[#888]">low-level · reverse-engineer · ml</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/0xXrer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <RiGithubFill className="h-5 w-5" />
            </a>
            <a
              href="https://discord.com/users/1287660832133611520"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] transition-colors hover:text-foreground"
              aria-label="Discord"
            >
              <RiDiscordFill className="h-5 w-5" />
            </a>
          </div>
        </header>

        <section className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#888]">Projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 px-5 py-6 transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-white/30"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold transition-colors hover:text-[#888]"
                    >
                      {project.name}
                    </a>
                    <RiExternalLinkFill className="h-4 w-4 text-[#888]" />
                  </div>
                  <p className="text-sm text-[#888]">{project.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-mono text-[#888]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-mono text-[#888] transition-colors hover:text-foreground"
                  >
                    Live demo
                    <RiExternalLinkFill className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
