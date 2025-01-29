"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTodo(formData) {
  const title = formData.get("title");
  await prisma.todo.create({
    data: { title },
  });
  revalidatePath("/");
}

export async function deleteTodo(id) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
}

export async function toggleTodo(id) {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });
  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });
  revalidatePath("/");
}
