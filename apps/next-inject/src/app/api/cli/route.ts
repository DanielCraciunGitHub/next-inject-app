import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { transactions, users } from "@/db/schema"
import { env } from "@/env.mjs"
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
export async function GET(req: NextRequest) {
  const authorizationHeader = req.headers.get("Authorization")
  const token = authorizationHeader?.replace("Bearer ", "")

  if (token) {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, token))

    if (user) {
      return NextResponse.json(
        { accessKey: env.GITHUB_PERSONAL_ACCESS_TOKEN },
        {
          status: 200,
        }
      )
    }
  }
  return NextResponse.json("Please pass in a valid user id", {
    status: 404,
    statusText: "Please pass in a valid user id",
  })
}
