import { Accordion, Accordions } from "fumadocs-ui/components/accordion"

interface FaqProps {}

export const FAQ = ({}: FaqProps) => {
  return (
    <Accordions type="single">
      <Accordion title="My Title">My Content</Accordion>
    </Accordions>
  )
}
