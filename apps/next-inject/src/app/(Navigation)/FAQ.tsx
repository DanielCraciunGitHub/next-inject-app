import Link from "next/link"
import { siteConfig } from "@/config"
import { Callout } from "fumadocs-ui/components/callout"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqProps {}

export const FAQ = ({}: FaqProps) => {
  return (
    <div id="faq" className="bg-gray-300 dark:bg-gray-900">
      <div className="mx-auto my-24 flex max-w-6xl flex-col space-y-6 lg:flex-row lg:gap-36 lg:space-y-0">
        <div className="shrink-0">
          <div className="w-full text-center text-xl font-bold tracking-tight text-white md:text-start md:text-3xl">
            Frequently Asked Questions
          </div>
          <Callout type="info" title="Have another question?" className="mx-2">
            Please do not hesitate to contact us by{" "}
            <Link
              rel="noopener noreferrer"
              className="text-blue-500 underline"
              href={`mailto:${siteConfig.email}`}
            >
              email
            </Link>{" "}
            or{" "}
            <Link
              rel="noopener noreferrer"
              className="text-blue-500 underline"
              // ! My X handle.
              href={siteConfig.socialLinks[3].href}
            >
              twitter
            </Link>
          </Callout>
        </div>
        <Accordion type="single" collapsible className="mx-4 md:mx-0 md:w-full">
          {siteConfig.faq.map((q) => (
            <AccordionItem key={q.questionName} value={q.questionName}>
              <AccordionTrigger className="text-start">
                {q.questionName}
              </AccordionTrigger>
              <AccordionContent>{q.acceptedAnswerText}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
