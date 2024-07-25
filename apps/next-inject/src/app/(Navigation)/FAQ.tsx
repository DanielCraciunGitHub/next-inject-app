import { siteConfig } from "@/config"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"

interface FaqProps {}

export const FAQ = ({}: FaqProps) => {
  return (
    <div id="faq" className="mx-auto w-full max-w-3xl space-y-6">
      <div className="text-center text-3xl font-bold tracking-tight md:text-5xl">
        Frequently Asked Questions
      </div>
      <Accordions type="single">
        {siteConfig.faq.map((q) => (
          <Accordion key={q.questionName} title={q.questionName}>
            {q.acceptedAnswerText}
          </Accordion>
        ))}
      </Accordions>
    </div>
  )
}
