import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTaskTitle: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}

export const ToDoList = (props: ToDoListType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickButtonHandler = () => {
        if (newTaskTitle.trim()) {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            newTaskTitle.trim() && props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onComplitedClickHandler = () => props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={onClickButtonHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onRemoveHandler = () => props.removeTask(el.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeStatus(el.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={el.isDone}
                            />
                            <span>{el.title}</span>
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