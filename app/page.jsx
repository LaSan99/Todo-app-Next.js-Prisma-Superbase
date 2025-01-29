import { prisma } from "@/lib/prisma";
import TodoItem from "./components/TodoItem";
import { addTodo, deleteTodo, toggleTodo } from "./actions/todoActions";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-white">
            Todo List
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Stay organized and get things done
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {completedTodos} of {totalTodos} tasks completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalTodos ? (completedTodos / totalTodos) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Add Todo Form */}
          <form action={addTodo} className="flex gap-2 mb-8">
            <input
              type="text"
              name="title"
              placeholder="What needs to be done?"
              required
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white
                       transition duration-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-xl
                       hover:bg-blue-600 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2
                       transition duration-200 font-medium"
            >
              Add Task
            </button>
          </form>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                No todos yet. Add one to get started!
              </p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                />
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Tasks
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {totalTodos - completedTodos}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Completed Tasks
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {completedTodos}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
