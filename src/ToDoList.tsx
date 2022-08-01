import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForm} from './AddItemFormType';
import {EditableSpan} from './EditableSpan';

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
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(el => {

                    const onRemoveHandler = () => props.removeTask(props.id, el.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeStatus(props.id, el.id, e.currentTarget.checked)
                    }
                    const onChangeTitleHandler = (title: string) => {
                        props.changeTaskTitle(props.id, el.id, title)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={el.isDone}
                            />
                            <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                > All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                > Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onComplitedClickHandler}
                > Completed
                </button>
            </div>
        </div>
    );
}

