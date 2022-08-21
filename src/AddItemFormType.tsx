import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField, IconButton} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickButtonHandler = () => {
        if (newTaskTitle.trim()) {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            newTaskTitle.trim() && props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField
                value={newTaskTitle}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}
                variant="outlined"
                label="Type value"
                error={!!error}
                helperText={error ? "Incorrect entry" : ''}
            />

            <IconButton color={'primary'} onClick={onClickButtonHandler}>
                <AddCircleIcon/>
            </IconButton>
        </div>
    )
}