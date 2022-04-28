import "./App.css";
import React, { useEffect } from "react";
import TaskList from "./components/TaskList";
import { getAllTasks } from "./sync/sync";
import TaskBoard from "./components/TaskBoard";

function App() {
  const [tasks, setTasks] = React.useState(null);

  useEffect(() => {
    getAllTasks().then((i) => setTasks(i));
  });

  return (
    <>
      <div>
        {!tasks ? "Loading..." : <TaskList name="Tasks" tasks={tasks} />}
      </div>
      <div>{!tasks ? "Loading..." : <TaskBoard tasks={tasks} />}</div>
    </>
  );
}

export default App;
