"use client";

export default function TodoItem({ todo, onDelete, onToggle }) {
  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  const handleToggle = async () => {
    await onToggle(todo.id);
  };

  return (
    <div
      className={`group flex items-center gap-4 p-4 border border-gray-200 
                rounded-xl transition-all duration-200 hover:shadow-md
                dark:border-gray-700 dark:hover:border-gray-600
                ${
                  todo.completed
                    ? "bg-gray-50 dark:bg-gray-800/50"
                    : "bg-white dark:bg-gray-800"
                }`}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-5 h-5 border-2 border-gray-300 rounded-md
                   checked:bg-blue-500 checked:border-blue-500
                   dark:border-gray-600 dark:checked:bg-blue-600
                   transition-colors duration-200 cursor-pointer
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
      </div>

      <span
        className={`flex-1 text-gray-800 dark:text-gray-200 transition-all duration-200
                   ${
                     todo.completed
                       ? "line-through text-gray-400 dark:text-gray-500"
                       : ""
                   }`}
      >
        {todo.title}
      </span>

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 px-3 py-1.5 
                 text-red-600 hover:text-red-700 hover:bg-red-50
                 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30
                 rounded-lg transition-all duration-200"
        aria-label="Delete todo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
