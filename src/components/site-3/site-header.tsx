"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { nav, whatsappLink } from "@/lib/site-3/content"
import { CymaticaLockup, CymaticaMark } from "@/components/site/cymatica-mark"

/** Mensagem que já vai preenchida ao abrir a conversa. */
const SAUDACAO =
  "Olá! Vim pelo site da Cymatica e gostaria de falar sobre um projeto."

/**
 * Navegação em pílula flutuante.
 *
 * Fica FORA do `#smooth-wrapper` — dentro dele o ScrollSmoother aplica
 * transform no contêiner e `position: fixed` deixa de grudar.
 *
 * A pílula agora inverte junto com a seção: sobre as ilhas claras ela vira
 * clara também, senão a barra escura flutuaria sobre papel branco.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [overLight, setOverLight] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      // Descobre o que está sob a barra: se o ponto logo abaixo dela cair
      // dentro de uma ilha `.light`, a pílula acompanha o tema.
      const probe = document.elementFromPoint(window.innerWidth / 2, 44)
      setOverLight(Boolean(probe?.closest(".light")))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6",
          overLight && "light"
        )}
      >
        <nav
          aria-label="Principal"
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between",
            "rounded-full border border-transparent px-5 py-3 text-foreground md:px-6",
            "transition-[background-color,border-color,backdrop-filter,color] duration-500",
            scrolled && "border-border bg-popover/80 backdrop-blur-xl"
          )}
        >
          <Link
            href="/"
            aria-label="Cymatica, página inicial"
            className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <CymaticaLockup />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="rounded-full p-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden"
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-background px-8 md:hidden"
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="site-h3 py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {item.label}
          </Link>
        ))}
        <a
          href={whatsappLink(SAUDACAO)}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          className="site-h3 py-3 text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Falar no WhatsApp
        </a>
      </div>

      <a
        href={whatsappLink(SAUDACAO)}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "fixed right-4 bottom-4 z-50 hidden items-center gap-3 rounded-full md:flex",
          "border border-border bg-popover/85 py-2.5 pr-3 pl-5 backdrop-blur-xl",
          "text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
      >
        Falar no WhatsApp
        <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
          <CymaticaMark variant="arcs" className="size-4" />
        </span>
      </a>
    </>
  )
}
