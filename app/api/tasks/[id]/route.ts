import { taskSchema } from '@/app/utils/validationSchemas'
import prisma from '@/prisma/client'
import { Priority, Status, Task } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const PATCH = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const body: Task = await request.json()

  const validation = taskSchema.safeParse(body)

  if (!validation.success) {
    const error = validation.error.errors[0].message
    return NextResponse.json({ error: error }, { status: 400 })
  }

  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) }
  })

  if (!task) {
    return NextResponse.json({ error: 'Task cannot be found' }, { status: 404 })
  }

  if (body.title != task.title) {
    const existing_title = await prisma.task.findFirst({
      where: { title: body.title }
    })
    if (existing_title) {
      return NextResponse.json({ error: 'Title already exist!' }, { status: 403 })
    }
  }

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status as Status,
      priority: body.priority as Priority,
      deadline: new Date(body.deadline),
      teamId: body.teamId
    }
  })

  return NextResponse.json(updatedTask)
}

const DELETE = async (request: NextRequest, { params: { id } }: { params: { id: string } }) => {
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  await prisma.task.delete({
    where: {
      id: task.id
    }
  })

  return NextResponse.json({})
}

export { PATCH, DELETE }