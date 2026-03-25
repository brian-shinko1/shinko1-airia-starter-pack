import { NextRequest, NextResponse } from "next/server"

const AIRIA_API_URL =
  "https://prodaus.api.airia.ai/v2/PipelineExecution/8bc7a75e-b8da-46d8-9002-a956ee2d521f"
const AIRIA_API_KEY = "ak-MjI5OTQ5ODYxNnwxNzczNzg5NDYxODk5fHRpLVVFRlNWRTVGVWlBdElFdGhkR0Z1WVRFPXwxfDEyNjczNjQ4MTQg"

export async function POST(req: NextRequest) {
  const { userInput } = await req.json()

  const response = await fetch(AIRIA_API_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": AIRIA_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput, asyncOutput: false }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "API request failed" }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}
