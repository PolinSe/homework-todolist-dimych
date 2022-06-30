import React from 'react';

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
}

export const ToDoList = (props: ToDoListType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li key={props.tasks[0].id}><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li key={props.tasks[1].id}><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li key={props.tasks[2].id}><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}