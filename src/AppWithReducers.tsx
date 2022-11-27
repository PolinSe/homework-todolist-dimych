import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemFormType';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reduser';

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'}
        ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasks(removeTaskAC(todolistId, id))
    }

    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, id, isDone))
    }

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, id, title))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeFilter = (todolistId: string, value: FilterType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>

                    <AddItemForm addItem={addTodolist}/>

                </Grid>

                <Grid container spacing={5}>

                    {
                        todolists.map(tl => {
                            let filteredTasks = tasks[tl.id]
                            if (tl.filter === 'active') {
                                filteredTasks = tasks[tl.id].filter(el => !el.isDone)
                            }
                            if (tl.filter === 'completed') {
                                filteredTasks = tasks[tl.id].filter(el => el.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper elevation={3} style={{padding: '20px'}}>
                                        <ToDoList
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
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>
        </div>
    )
}


export default AppWithReducers;
