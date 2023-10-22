import { taskSchema } from "@/app/utils/validationSchemas";
import prisma from "@/prisma/client";
import { Priority, Status, Task } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const PATCH = async (request: NextRequest, {params: {id}}: {params: {id: string}}) => {
  const body: Task = await request.json();

  const validation = taskSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) {
    return NextResponse.json(
      { error: "Task cannot be found" },
      { status: 404 },
    );
  }

  if(body.title != task.title){
    const existing_title = await prisma.task.findFirst({
      where: { title: body.title },
    });
    if (existing_title) {
      return NextResponse.json(
        { ErrorMessage: "Title already exist!" },
        { status: 403 },
      );
    }
  }

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status as Status,
      priority: body.priority as Priority,
    },
  });

  return NextResponse.json(updatedTask);
}
  

export { PATCH };
