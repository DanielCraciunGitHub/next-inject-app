export const priceIds: PriceIds = {
  "drizzle-turso": {
    priceId: "price_1PgwaiEPAN9phIe0HTp6P82T",
    bundle: "pro",
    hot: false,
  },
  "next-auth": {
    priceId: "price_1PgwabEPAN9phIe0GCLqa2jp",
    bundle: "pro",
    hot: true,
  },
  sanity: {
    priceId: "price_1PjJV5EPAN9phIe0EJbu6Rf7",
    bundle: "pro",
    hot: false,
  },
  resend: {
    priceId: "price_1PgwalEPAN9phIe0GBZoxSeg",
    bundle: "pro",
    hot: false,
  },
  stripe: {
    priceId: "price_1PgwanEPAN9phIe0BSBo83hm",
    bundle: "pro",
    hot: true,
  },
  metadata: { priceId: "Free", bundle: "", hot: false },
  "react-email": { priceId: "Free", bundle: "", hot: false },
  pro: { priceId: "Bundle", bundle: "", hot: true },
}
type PriceIds = Record<
  string,
  {
    priceId?: "Free" | "Bundle" | (string & {})
    bundle: "pro" | (string & {})
    hot: boolean
  }
>
