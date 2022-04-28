export default function TaskModal({ task, setIsOpen }) {
  return (
    <div
      className="fixed inset-0 border border-black bg-white bg-opacity-75"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="absolute w-9/12 h-5/6 p-6 border border-red bg-white"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-4 h-4 border border-black rounded-full"></div>
        <h1>{task.data.summary}</h1>
        {task.data.due && (
          <button className="border border-red-600">
            {task.data.due.toLocaleString().substring(0, 10)}
          </button>
        )}
        <p>{JSON.stringify(task)}</p>

        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
}
