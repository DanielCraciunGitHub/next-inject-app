import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { transactions } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

const cliSchema = z.object({
  pluginName: z.string(),
  authKey: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const options = cliSchema.parse(data)

    const [authenticated] = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.productName, options.pluginName),
          eq(transactions.userId, options.authKey)
        )
      )

    if (authenticated) {
      return NextResponse.json("Success", {
        status: 200,
      })
    } else {
      return new NextResponse(
        "Please authenticate with the CLI or purchase this plugin",
        {
          status: 400,
          statusText:
            "Please authenticate with the CLI or purchase this plugin",
        }
      )
    }
  } catch (error: any) {
    console.log(error)
    return new NextResponse("Error", {
      status: 400,
      statusText: "An unknown error has occured",
    })
  }
}
