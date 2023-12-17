import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { Team } from "@prisma/client"
import { teamSchema } from "@/app/utils/validationSchemas"

const POST = async (request: NextRequest) => {
  const body: Team = await request.json()
  const validation = teamSchema.safeParse(body)

  if (!validation.success) {
    const error = validation.error.errors[0].message
    return NextResponse.json({ error: error }, { status: 400 })
  }

  const team = await prisma.team.findFirst({
    where: { name: body.name }
  })

  if (team) {
    return NextResponse.json({ error: "Name already exist" }, { status: 403 })
  }

  const newTeam = await prisma.team.create({
    data: {
      name: body.name
    }
  })

  return NextResponse.json(newTeam, { status: 201 })
}

export { POST }
