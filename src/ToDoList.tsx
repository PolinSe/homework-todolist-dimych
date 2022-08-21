import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemFormType';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, id: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const ToDoList = (props: ToDoListType) => {

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onComplitedClickHandler = () => props.changeFilter(props.id, 'completed')
    const removeTodolist = () => props.removeTodolist(props.id)


    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const сhangeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={сhangeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {props.tasks.map(el => {

                    const onRemoveHandler = () => props.removeTask(props.id, el.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeStatus(props.id, el.id, e.currentTarget.checked)
                    }
                    const onChangeTitleHandler = (title: string) => {
                        props.changeTaskTitle(props.id, el.id, title)
                    }

                    return (
                        <div key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={el.isDone}
                                size={'small'}
                            />
                            <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete fontSize={"small"}/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                > All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                > Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onComplitedClickHandler}
                > Completed
                </Button>
            </div>
        </div>
    );
}

