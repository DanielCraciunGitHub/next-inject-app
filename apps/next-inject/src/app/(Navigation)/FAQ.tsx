import Link from "next/link"
import { siteConfig } from "@/config"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"
import { Callout } from "fumadocs-ui/components/callout"

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
      <Callout type="info" title="Have another question?">
        Please don't hesitate to{" "}
        <Link
          rel="noopener noreferrer"
          className="text-blue-500 underline"
          href="mailto:danielcracbusiness@gmail.com"
        >
          contact us
        </Link>
      </Callout>
    </div>
  )
}
