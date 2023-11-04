import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { Task, Status, Priority } from '@prisma/client'
import { taskSchema } from '@/app/utils/validationSchemas'

const POST = async (request: NextRequest) => {
  const body: Task = await request.json()
  const validation = taskSchema.safeParse(body)

  if (!validation.success) {
    const error = validation.error.errors[0].message
    return NextResponse.json({ error: error }, { status: 400 })
  }

  const task = await prisma.task.findFirst({
    where: { title: body.title }
  })

  if (task) {
    return NextResponse.json({ error: 'Title already exist' }, { status: 403 })
  }

  if (body.teamId) {
    const team = await prisma.team.findFirst({
      where: { id: body.teamId }
    })

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }
  }

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status as Status,
      priority: body.priority as Priority,
      deadline: validation.data.deadline,
      teamId: body.teamId
    }
  })

  return NextResponse.json(newTask, { status: 201 })
}

export { POST }
