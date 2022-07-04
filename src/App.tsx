import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    //useState, data
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
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
    const removeTask = (id: number) => {
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
            />
        </div>
    );
}

export default App;
