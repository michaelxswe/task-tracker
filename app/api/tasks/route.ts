import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { taskSchema } from "../../utils/validationSchemas";
import { Task, Status, Priority } from "@prisma/client";

const POST = async (request: NextRequest) => {
  const body: Task = await request.json();
  const validation = taskSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const task = await prisma.task.findFirst({
    where: { title: body.title },
  });

  if (task) {
    return NextResponse.json(
      { ErrorMessage: "Title already exist" },
      { status: 403 },
    );
  }


  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status as Status,
      priority: body.priority as Priority,
      ...(body.dueDate
        ? { dueDate: new Date(body.dueDate) }
        : {}),
    },
  });

  return NextResponse.json(newTask, { status: 201 });
};

export {POST}