import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { taskSchema } from '../../utils/validationSchemas'
import { Task, Status, Priority } from '@prisma/client'

const POST = async (request: NextRequest) => {
  const body: Task = await request.json()
  const validation = taskSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const task = await prisma.task.findFirst({
    where: { title: body.title }
  })

  if (task) {
    return NextResponse.json(
      { ErrorMessage: 'Title already exist' },
      { status: 403 }
    )
  }

  if (body.teamId) {
    const team = await prisma.team.findFirst({
      where: { id: body.teamId }
    })

    if (!team) {
      return NextResponse.json(
        { ErrorMessage: 'Team not found' },
        { status: 404 }
      )
    }
  }

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status as Status,
      priority: body.priority as Priority,
      deadline: new Date(body.deadline),
      teamId: body.teamId
    }
  })

  return NextResponse.json(newTask, { status: 201 })
}

export { POST }
