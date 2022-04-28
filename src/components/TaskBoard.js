import { useEffect } from "react";
import * as PropTypes from "prop-types";
import TaskList from "./TaskList";

export default function TaskBoard({ tasks }) {
  const cols = groupBy(tasks, (i) => i.data.status);

  return (
    <div>
      {Object.entries(cols).map((c) => (
        <TaskList name={c[0]} tasks={c[1]} />
      ))}
    </div>
  );
}

// https://stackoverflow.com/a/64489535
const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});
