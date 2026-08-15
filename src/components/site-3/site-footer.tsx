import Link from "next/link"

import { Container } from "./primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { footer, studio } from "@/lib/site-3/content"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="py-20 md:py-28">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between lg:gap-24">
          <div className="max-w-md">
            <CymaticaMark className="size-10 text-foreground" title="Cymatica" />
            <p className="site-h3 mt-8">{footer.statement}</p>
          </div>

          <div className="flex flex-wrap gap-x-20 gap-y-12">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="site-label text-muted-foreground">{column.title}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <p className="site-label text-muted-foreground">Contato</p>
              <ul className="mt-6 flex flex-col gap-3 text-sm">
                <li>
                  <a
                    href={`mailto:${studio.email}`}
                    className="text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {studio.email}
                  </a>
                </li>
                <li className="text-muted-foreground">{studio.instagram}</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-24 text-xs text-muted-foreground">{footer.legal}</p>
      </Container>
    </footer>
  )
}
