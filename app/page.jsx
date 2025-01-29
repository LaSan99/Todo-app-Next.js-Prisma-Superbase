import { prisma } from "@/lib/prisma";
import TodoItem from "./components/TodoItem";
import { addTodo, deleteTodo, toggleTodo } from "./actions/todoActions";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Todo List</h1>

      <form action={addTodo} className="flex gap-2 mb-8">
        <input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          required
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </main>
  );
}
