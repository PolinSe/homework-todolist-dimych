
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                className={error ? 'error' : ''}
                value={newTaskTitle}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}