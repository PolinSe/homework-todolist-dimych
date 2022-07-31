import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'active'},
            {id: todolistId2, title: 'What to buy', filter: 'completed'}
        ]
    )

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],
    })

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask: TasksType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }
    const changeFilter = (todolistId: string, value: FilterType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === 'active') {
                        filteredTasks = tasks[tl.id].filter(el => !el.isDone)
                    }
                    if (tl.filter === 'completed') {
                        filteredTasks = tasks[tl.id].filter(el => el.isDone)
                    }

                    return <ToDoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
