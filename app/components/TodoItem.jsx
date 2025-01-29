"use client";

export default function TodoItem({ todo, onDelete, onToggle }) {
  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  const handleToggle = async () => {
    await onToggle(todo.id);
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="h-5 w-5"
      />
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-red-600 hover:bg-red-100 rounded"
      >
        Delete
      </button>
    </div>
  );
}
