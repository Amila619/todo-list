import { useState } from "react";

export default function Main() {

    const [taskList, setTaskList] = useState([]);
    const [btnVal, setBtnVal] = useState('Add');
    const [note, setNote] = useState('');
    const [upStatus, setUpStatus] = useState(false);
    const [editIndex, setEditIndex] = useState(null);


    function handleSubmit(event) {
        event.preventDefault()
        if ((note.length !== 0) && !upStatus) {
            setTaskList(taskList => [
                ...taskList,
                note
            ])
        } else {
            setTaskList(taskList =>
                taskList.map((_, i) => (i === editIndex ? note : _))
            )
        }
        setNote('')
        setBtnVal("Add")
        setUpStatus(false)
    }

    function handleDelete(index) {
        setTaskList(taskList => taskList.filter((_, i) => index !== i))
    }

    function handleEdit(index) {
        setUpStatus(true)
        setBtnVal("Update")
        setNote(taskList[index])
        setEditIndex(index)
    }

    const allTasks = taskList.map((task, index) => (
        <li key={index} className="flex justify-between border-b last:border-none py-2 px-4 text-gray-700">
            <span

            >
                {task}
            </span>
            <div className="flex gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-600 cursor-pointer" onClick={() => handleDelete(index)}>
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-600 cursor-pointer" onClick={() => handleEdit(index)}>
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>

            </div>
        </li>
    ))

    return (
        <main className="flex items-center justify-center h-screen bg-red-100 w-full ">
            <div>
                <form onSubmit={handleSubmit} method="POST" className="bg-white rounded-2xl border shadow-x1 p-10 max-w-lg">
                    <div className="flex flex-col items-center space-y-4">
                        <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                            Task Handler
                        </h1>
                        <p className="text-sm text-gray-500 text-center w-5/6">
                            Hello, please enter your tasks to get it done.
                        </p>
                        <input
                            type="text"
                            id="note"
                            name="note"
                            placeholder="task"
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            className="border-2 rounded-lg w-full h-12 px-4"
                        />
                        <button
                            className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full cursor-pointer"
                        >
                            {btnVal}
                        </button>
                    </div>
                </form>
                <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
                    {allTasks}
                </ul>
            </div>
        </main>
    )
}