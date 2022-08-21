import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemFormType';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'}
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks, [newTodolistId]: [
                {id: v1(), title: "new task", isDone: false}
            ]
        })

    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})
    }

    const changeTaskTitle = (todolistId: string, id: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: title} : el)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        todolists.map(el => el.id === todolistId ? {...el, title: title} : el)
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


export default App;
