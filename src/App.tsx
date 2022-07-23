import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    //useState, data
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    //function

    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const removeTask = (id: string) => {
        filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    //jsx
    return (
        <div className="App">
            <ToDoList
                title='What to learn'
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
