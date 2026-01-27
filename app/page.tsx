import { RiGithubFill, RiDiscordFill, RiExternalLinkFill } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import projects from "@/data/projects.json"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="flex items-center gap-5 mb-16">
          <Image
            src="https://github.com/0xXrer.png"
            alt="Avatar"
            width={72}
            height={72}
            className="rounded-full ring-2 ring-border"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">elowen.im</h1>
            <p className="text-muted-foreground mt-1">developer</p>
            <div className="flex items-center gap-4 mt-3">
              <a
                href="https://github.com/0xXrer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <RiGithubFill className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com/users/1287660832133611520"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Discord"
              >
                <RiDiscordFill className="w-5 h-5" />
              </a>
            </div>
          </div>
        </header>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Projects
            </h2>
            {/* <Link
              href="/admin"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              + add
            </Link> */}
          </div>

          {projects.length === 0 ? (
            <p className="text-muted-foreground text-sm">No projects yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-muted-foreground/40 transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <Image
                      src={project.image || "/projects/default.jpg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{project.name}</h3>
                      <RiExternalLinkFill className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                    {project.tags.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mt-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-[11px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}