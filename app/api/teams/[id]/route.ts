import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { Team } from "@prisma/client"
import { teamSchema } from "@/app/utils/validationSchemas"

const PATCH = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const body: Team = await request.json()
  const validation = teamSchema.safeParse(body)

  if (!validation.success) {
    const error = validation.error.errors[0].message
    return NextResponse.json({ error: error }, { status: 400 })
  }

  const team = await prisma.team.findUnique({
    where: { id: parseInt(id) }
  })

  if (!team) {
    return NextResponse.json({ error: "Team cannot be found" }, { status: 404 })
  }

  if (body.name != team.name) {
    const existing_name = await prisma.team.findFirst({
      where: { name: body.name }
    })

    if (existing_name) {
      return NextResponse.json({ error: "Name already exist!" }, { status: 403 })
    }
  }

  const updatedTeam = await prisma.team.update({
    where: { id: team.id },
    data: {
      name: body.name
    }
  })

  return NextResponse.json(updatedTeam, { status: 201 })
}

const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const team = await prisma.team.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 })
  }

  await prisma.team.delete({
    where: {
      id: team.id
    }
  })

  return NextResponse.json({})
}

export { PATCH, DELETE }
