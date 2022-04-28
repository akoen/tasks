import { useState } from "react";
import TaskModal from "./TaskModal";

export default function TaskCard({ task }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center m-3 p-3 gap-4 cursor-pointer"
      >
        <div className="inline w-4 h-4 border border-black rounded-full"></div>
        <h1 className="">{task.data.summary}</h1>
        {task.data.due && (
          <button
            className="ml-auto p-1 text-xs text-red-600 border border-red-600 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {task.data.due.toLocaleString().substring(0, 10)}
          </button>
        )}
      </div>
      {isOpen && <TaskModal task={task} setIsOpen={setIsOpen} />}
    </>
  );
}
