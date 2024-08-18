/**
 * Get started by running the "dev" command with a package manager of your choice.
 * E.g. pnpm dev, or npm run dev.
 *
 * This is an example of a welcome email with these sections:
 *
 * @image The icon that represents the brand of your SaaS
 * @title The title that appears right below the image, typically your SaaS name.
 * @welcomeText A section that welcomes the user and could even be used for a CTA.
 * @footerText A section that shows additional information and an unsubscribe link, which could be implemented
 * with a `/unsubscribe` url on your page.
 *
 * These components can be used with popular email sending services like nodemailer and resend.
 * Be sure to check out my resend and nodemailer plugins over at https://nextinject.pro/plugins
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/index"

interface WelcomeProps {
  firstName: string
}

export const WelcomeEmail = ({ firstName }: WelcomeProps) => {
  // ! The <FIRSTNAME> is a placeholder when building emails in development.
  const previewText = `Next Inject Purchase Confirmation`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-16 max-w-xl rounded border border-solid border-gray-300 p-6">
            {/* Image */}
            <Section className="mt-24">
              <Img
                // ! NOTE: This image will not show up even if you have an image inside the public/images folder.
                // ! This is because the react-email application doesn't share the same public folder for static assets.
                // ! If you want to see the static assets in the react-email app, make sure to change /images to /static.
                src={`${siteConfig.url}/images/next-inject.webp`}
                width="80"
                height="80"
                alt="Next-Inject"
                className="mx-auto my-0 rounded"
              />
            </Section>
            {/* Title/Slogan */}
            <Section>
              <Link href={siteConfig.url} className="text-black">
                <Heading className="text-center font-extrabold">
                  Next Inject
                </Heading>
              </Link>
              <Text className="text-center text-gray-500">
                Revolutionizing Next.js Web Development with Plugins
              </Text>
            </Section>
            {/* Welcome Talk */}
            <Section>
              <Text>
                Hey {firstName ?? "<FIRSTNAME>"} 👋, thanks for the purchase!
              </Text>
              <Text>
                As a token of our appreciation, we would like to offer you the{" "}
                <strong>VIP Role</strong> in our Discord Community.
              </Text>

              <Text>
                This opportunity is available <strong>forever</strong>, and the{" "}
                <Link href={siteConfig.socialLinks[0].href}>
                  link is live here.
                </Link>
              </Text>

              <Heading as="h3">How to use your new plugins</Heading>
              <Section className="space-y-0.5">
                <Text>
                  1.{" "}
                  <Link href={`${siteConfig.url}/login`}>
                    Create an account
                  </Link>{" "}
                  using the same email you purchased the plugin with.
                </Text>
                <Text>
                  2. Visit the{" "}
                  <Link href={`${siteConfig.url}/dashboard`}>dashboard</Link> to
                  see your purchased plugins.
                </Text>
                <Text>
                  3. Follow the instructions on the dashboard to setup the CLI
                  and start injecting your plugins!
                </Text>
              </Section>
            </Section>
            {/* Footer Text and Unsubscribe */}
            <Hr />
            <Section>
              <Text className="leading-12 text-xs text-gray-400">
                This invitation was intended for{" "}
                <span className="text-black">{firstName ?? "<FIRSTNAME>"}</span>
                . This email was sent from{" "}
                <span className="text-black">Next Inject</span>.
              </Text>
              <Text className="leading-12 text-xs text-gray-400">
                If you have any questions or concerns, please{" "}
                <Link href={`mailto:${siteConfig.email}`}>email us here.</Link>
              </Text>
              {/* <Text className="leading-12 text-xs text-gray-400">
                <Link href={`${siteConfig.url}/unsubscribe`}>unsubscribe</Link>
              </Text> */}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
