import { LightSection, SectionLabel } from "@/components/site-2/primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { testimonials } from "@/lib/site-2/content"

/** Terceira ilha clara. Depoimento sobre papel lê como carta, não como banner. */
export function Testimonials() {
  return (
    <LightSection>
      <SectionLabel>O que dizem</SectionLabel>

      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.author} data-reveal="" className="flex h-full flex-col">
            <CymaticaMark variant="nodes" className="size-6 text-muted-foreground" />
            <blockquote className="site-h3 mt-8 flex-1 text-balance">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm text-muted-foreground">
              <span className="text-foreground">{testimonial.author}</span>
              {" · "}
              {testimonial.role}, {testimonial.company}
            </figcaption>
          </figure>
        ))}
      </div>
    </LightSection>
  )
}
