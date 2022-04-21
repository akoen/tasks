export default function TaskCard(props) {
    return (
        <div className="flex items-center bg-gray-100 rounded-md m-3 p-3 gap-4">
            <div className="w-4 h-4 border border-black rounded-full"></div>
            <h1 className="">{props.summary}</h1>
            <div className="ml-auto">{props.end.substring(0, 10)}</div>
            {/*<div className="ml-auto">{props.end}</div>*/}
        </div>
    )
}