import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { teamSchema } from '../../utils/validationSchemas'
import { Team } from '@prisma/client'

const POST = async (request: NextRequest) => {
  const body: Team = await request.json()
  const validation = teamSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const team = await prisma.team.findFirst({
    where: { name: body.name }
  })

  if (team) {
    return NextResponse.json(
      { ErrorMessage: 'Name already exist' },
      { status: 403 }
    )
  }

  const newTeam = await prisma.team.create({
    data: {
      name: body.name
    }
  })

  return NextResponse.json(newTeam, { status: 201 })
}

export { POST }
