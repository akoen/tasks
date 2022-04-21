import TaskCard from "./TaskCard";

export default function TaskList(props) {
    return (
        <div>
        {props.tasks.map(i => <TaskCard {...i}/>)}
        </div>
    )
}