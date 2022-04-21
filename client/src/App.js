import './App.css';
import React from "react"
import TaskList from "./components/TaskList";

const tasks = [{title: 'Fix car', due: new Date("2022-01-01")}, {title: 'Eat grass', due: new Date("2022-03-12")}]



function App() {
    const [tasks, setTasks] = React.useState(null)

    React.useEffect(() => {
        fetch("/api")
            .then(res => res.json())
            .then(tasks => setTasks(tasks))
    })

    return (
        <div>
            {!tasks ? "Loading..." : <TaskList tasks={tasks}/>}
        </div>
    )
}

export default App;
