import { Container, SectionLabel, Reveal } from "@/components/site/primitives"
import { CymaticaMark } from "@/components/site/cymatica-mark"
import { testimonials } from "@/lib/site/content"

/** Depoimentos em grade calma — sem carrossel automático roubando atenção. */
export function Testimonials() {
  return (
    <section className="border-t border-border py-28 md:py-40">
      <Container>
        <SectionLabel>O que dizem</SectionLabel>

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.author} delay={(i % 2) * 0.08}>
              <figure className="flex h-full flex-col">
                <CymaticaMark
                  variant="nodes"
                  className="size-6 text-muted-foreground"
                />
                <blockquote className="site-h3 mt-8 flex-1 text-balance">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 text-sm text-muted-foreground">
                  <span className="text-foreground">{testimonial.author}</span>
                  {" · "}
                  {testimonial.role}, {testimonial.company}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
