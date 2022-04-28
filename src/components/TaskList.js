import TaskCard from "./TaskCard";
import { useState } from "react";

export default function TaskList({ name, tasks }) {
  const [filters, setFilters] = useState([filterCompleted]);

  return (
    <>
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="divide-y-2">
        {filters
          .reduce((d, f) => d.filter(f), tasks)
          .map((i) => (
            <TaskCard task={i} />
          ))}
      </div>
    </>
  );
}

function filterCompleted(task) {
  return task.data.status !== "COMPLETED";
}
